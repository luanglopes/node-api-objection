import path from 'path'

const helpers = {
  /**
   * Returns absolute model path for models inside src/models folder
   */
  importModelPath(modelName: string): string {
    return path.join(__dirname, '..', 'model', modelName)
  },
}

export default helpers
