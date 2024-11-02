import type { Nuxt } from 'nuxt/schema';
import { readdir, existsSync, readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import {parse, type Expression, type SpreadElement} from 'acorn';
import {transform} from 'esbuild';

export default async (nuxt: Nuxt, path: string) => {
    console.dir(`[stories]: searching for components in ${path}`, {
        colors: 'green'
    })
    if (!existsSync(path)) {
        throw new Error(`Path ${path} could not be found`)
    }
    if (!existsSync(nuxt.options.buildDir + '/soa-components')) {
        mkdirSync(nuxt.options.buildDir + '/soa-components')
        mkdirSync(nuxt.options.buildDir + '/soa-components/components')
    }
    let filePaths: string[] = [];
    readdir(path, {
        recursive: true,
    }, (err, files) => {
        filePaths = files.filter((file) => {
            if (typeof file === 'string') {
                return file.endsWith('stories.ts')
            } 
            return false
        }).map((file) => (file as string).replaceAll('\\', '/')) as string[];
    })
    for (const file of filePaths) {
        const openedFile = readFileSync(path + '/' + file);
        const tranformed = await transform(openedFile, {loader: 'ts'}).then(item => item.code);
        const ast = parse(tranformed, {
            ecmaVersion: 2020,
            sourceType: 'module',
        })
        for (const node of ast.body) {
            if (
                node.type === 'ExpressionStatement'
            ) {
                const call = node.expression;
                if (
                    call.type === 'CallExpression' &&
                    call.callee.type === 'Identifier' &&
                    call.callee.name === 'generateComponentStory'
                ) {
                    const properties = astToObject(call.arguments[0]);
                    writeFileSync(
                        nuxt.options.buildDir + '/soa-components/components/' + file.replaceAll('/', '').replaceAll('.stories.ts', '.ts'),
                        `export default ${JSON.stringify(properties)}`
                    )
                }
            }
        }
    }
}

function astToObject(node: Expression | SpreadElement): any {
    switch (node.type) {
      case "ObjectExpression": {
        const obj: Record<string, any> = {};
        for (const prop of node.properties) {
          if (prop.type === "Property") {
            const key = (prop.key as any).name ?? (prop.key as any).value;
            obj[key] = astToObject(prop.value as any);
          }
        }
        return obj;
      }
      case "ArrayExpression": {
        return node.elements.map((el) => astToObject(el as any)).filter(Boolean);
      }
      case "Literal": {
        return node.value;
      }
      case "ImportExpression": {
        const source = node.source;
        if (source.type === 'Literal') {
            return source.value
        }
      }
      case "Identifier": {
        if (node.type === 'Identifier') {
            return node.name
        }
      }
      // No default
    }
  }