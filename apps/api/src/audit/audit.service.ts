import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AuditService {
    private logger = new Logger('Audit');
    private filePath = path.join(process.cwd(), 'audit.log');

    log(action: string, userId: string, details?: any) {
        const entry = JSON.stringify({
            timestamp: new Date().toISOString(),
            action,
            userId,
            details,
        });

        this.logger.log(entry);
        fs.appendFileSync(this.filePath, entry + '\n');
    }
    getLogs() {
    return this.logs;
    }
    private logs: any[] = [];
}