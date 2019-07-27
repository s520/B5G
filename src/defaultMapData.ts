import * as fse from 'fs-extra'
import path from 'path'
import * as yaml from 'js-yaml'

import { IMapData } from './definition/iMapData';
import { IMapDefinition } from './definition/iMapDefinition';
import { convert } from './convert';

/**
 * 定義ファイルのパス
 */
const defaultSyntaxDefinitionPath = path.join(__dirname, 'mapgrammar.yaml')

/**
 * B5が保持している定義ファイルからIMapDataを生成して返します。
 */
export const getDafaultMapData = (): Promise<IMapData> => {
    return new Promise((resolve, reject) => {
        fse.readFile(defaultSyntaxDefinitionPath, 'utf8', (err, yamlData) => {
            if (err) {
                reject(err)
            }

            const definition: IMapDefinition[] = yaml.safeLoad(yamlData)
            const mapData = convert(definition)
            resolve(mapData)
        })
    })
}
