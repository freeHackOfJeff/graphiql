import path from 'path'

import { getFileExtension, getPathWithoutExtension, resolveFile, requireFile } from './fileUtils'

describe('getFileExtension', ()=>{
  it ('should resolve an extension', ()=> {
    const extension = getFileExtension('example/example.txt')
    expect(extension).toEqual('txt')
  })
  it ('should resolve null when no extension is present', ()=> {
    const extension = getFileExtension('example/example')
    expect(extension).toEqual(null)
  })
  
   it ('should return an extension with multiple dots in the path', ()=> {
    const extension = getFileExtension('example.example/example/something.esm.js')
    expect(extension).toEqual('js')
  })
})

describe('getPathWithoutExtension', ()=>{
  it ('should resolve when path has extension', ()=> {
    const extension = getPathWithoutExtension('example/example.txt', 'txt')
    expect(extension).toEqual('example/example')
  })
  it ('should resolve when path has no extension', ()=> {
    const extension = getPathWithoutExtension('example/example.example/example', null)
    expect(extension).toEqual('example/example.example/example')
  })
})

describe('requireFile', ()=>{
  it ('should require file with extension', ()=> {
    const file = requireFile('../package.json')
    expect(file.name).toEqual('graphql-language-service-interface')
  })
  it ('should fail when requiring an invalid extension', ()=> {
    expect(
      () => requireFile('../.npmignore')
    ).toThrowError(`cannot require() module with extension 'npmignore'`)
  })
  it ('should require file with no extension using js', ()=> {
    const config = requireFile(path.join(__dirname, '../../../jest.config'))
    expect(config.collectCoverage).toEqual(true)
  })
   it ('should require file with no extension using json', ()=> {
    const file = requireFile(path.join(__dirname, '../package'))
    expect(file.name).toEqual('graphql-language-service-interface')
  })
})

describe('resolveFile', () => {
  it ('should resolve when path has extension', ()=> {
    const resolvedPath = resolveFile('../package.json')
    expect(resolvedPath).toEqual(require.resolve(path.join(__dirname, '../package.json')))
  })
  
  it ('should resolve when path has extension', ()=> {
    const resolvedPath = resolveFile(path.join(__dirname, '../package'))
    expect(resolvedPath).toEqual(require.resolve(path.join(__dirname, '../package.json')))
  })
  it ('should resolve when path has extension', ()=> {
    const resolvedPath = resolveFile('../../../.eslintrc.js')
    expect(resolvedPath).toEqual(require.resolve(path.join(__dirname, '../../../.eslintrc.js')))
  })
  it ('should resolve when path has no extension', ()=> {
    const resolvedPath = resolveFile(path.join(__dirname, '../../../.eslintrc'))
    expect(resolvedPath).toEqual(require.resolve(path.join(__dirname, '../../../.eslintrc.js')))
  })
})
