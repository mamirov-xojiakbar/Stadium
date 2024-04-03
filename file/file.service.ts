import { Injectable, InternalServerErrorException } from "@nestjs/common";

import * as uuid from "uuid";
import * as path from "node:path";
import * as fs from "node:fs";

@Injectable()
export class FileService {
  async saveFile(file: any) {
    try {
      const fileName = uuid.v4() + ".jpg";
      const filepath = path.resolve(__dirname, "..", "static");
      if (!fs.existsSync(filepath)) {
        fs.mkdirSync(filepath, { recursive: true });
      }
      fs.writeFileSync(path.join(filepath, fileName), file.buffer);

      return fileName;
    } catch (error) {
      throw new InternalServerErrorException("faylga yozishda xatolik");
    }
  }
}
