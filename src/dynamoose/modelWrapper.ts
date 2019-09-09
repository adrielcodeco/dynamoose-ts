import { ModelConstructor } from 'dynamoose'

export type Constructor<T = {}> = new (...args: any[]) => T

export function ModelWrapper<T> (
  modelConstructor: Constructor<T>
): ModelConstructor<T, Partial<T>> {
  return modelConstructor as ModelConstructor<T, Partial<T>>
}
