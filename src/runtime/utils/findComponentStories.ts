import type { Nuxt } from 'nuxt/schema';
import { readdir, existsSync, readFileSync, mkdirSync } from 'node:fs';
import {parse, type Expression, type ImportDeclaration, type SpreadElement} from 'acorn';
import {transform} from 'esbuild';
import type { ResolvedStoryConfig } from '../../types';
import { createResolver } from '@nuxt/kit';

function resolveComponentToSrcDir(path: string, nuxt: Nuxt) {
  const componentPath = path
    .replaceAll('~~/', `${nuxt.options.rootDir}/`)
    .replaceAll('~/', `${nuxt.options.srcDir}/`);
  const resolveName = createResolver(import.meta.url).resolve('.').endsWith('dist') ? './runtime/pages' : '../pages';
  const resolvedCurrentPath = createResolver(import.meta.url).resolve(resolveName);
  const componentPathParts = componentPath.split('/');
  const resolvedPathParts = resolvedCurrentPath.split('/');
  const shortest = componentPathParts.length > resolvedPathParts.length ? resolvedPathParts : componentPathParts;
  const common: string[] = [];
  shortest.forEach((part, index) => {
    if (componentPathParts[index] === resolvedPathParts[index]) {
      common.push(part);
    }
  });
  const commonPart = common.join('/');
  const shortComponentPath = componentPath.replace(commonPart, '').split('/').filter(part => part !== '');
  const shortResolvedPath = resolvedCurrentPath.replace(commonPart, '').split('/').filter(part => part !== '');
  if (shortResolvedPath.length === 0) {
    const finalPath = ['.'];
    finalPath.push(...shortComponentPath);
    return finalPath.join('/');
  } else {
    const finalPath: string[] = [];
    for (const _pathPart of shortResolvedPath) {
      finalPath.push('..');
    }
    finalPath.push(...shortComponentPath);
    return finalPath.join('/');
  }
}

export default async (nuxt: Nuxt, path: string) => {
  console.dir(`[stories]: searching for components in ${path}`, {
    colors: 'green'
  });
  if (!existsSync(path)) {
    throw new Error(`Path ${path} could not be found`);
  }
  if (!existsSync(nuxt.options.buildDir + '/soa')) {
    mkdirSync(nuxt.options.buildDir + '/soa');
  }
  let filePaths: string[] = [];
  readdir(path, {
    recursive: true,
  }, (err, files) => {
    filePaths = files.filter((file) => {
      if (typeof file === 'string') {
        return file.endsWith('stories.ts');
      } 
      return false;
    }).map((file) => (file as string).replaceAll('\\', '/')) as string[];
  });
  const components: ResolvedStoryConfig[] = [];
  for (const file of filePaths) {
    console.dir(`parsing component ${file}`);
    const openedFile = readFileSync(path + '/' + file);
    const transformed = await transform(openedFile, {loader: 'ts'}).then(item => item.code);
    const ast = parse(transformed, {
      ecmaVersion: 2020,
      sourceType: 'module',
    });
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
          const properties = astToObject(call.arguments[0]) as ResolvedStoryConfig;
          const componentPath = resolveComponentToSrcDir(properties.component, nuxt);
          components.push({
            ...properties,
            component: componentPath,
          });
          break;
        }
      }
    }
  }
  return components;
};

function astToObject(node: Expression | SpreadElement | ImportDeclaration): any {
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
        return source.value;
      }
      break;
    }
    case "Identifier": {
      return node.name;
    }
      // No default
  }
}