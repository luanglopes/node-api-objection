import path from 'path'

const dbHelpers = {
  /**
   * Returns absolute model path for models inside src/models folder
   */
  getModelPath(modelName: string): string {
    return path.join(__dirname, '..', 'model', modelName)
  },
}

export default dbHelpers
