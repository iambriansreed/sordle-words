/// <reference types="node" />
/**
 *
 * Usage: $ npx tsx validate.ts
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const DIR = './5';
const OUTPUT_FILE = './5.json';

function validate() {
    const words = execSync(
        `find ${DIR} -type f -name '*.json' | grep -v '/[0-9]*\.json$' | sed 's|.*/||; s/\.json$//' | sort`,
        {
            encoding: 'utf-8',
        },
    )
        .trim()
        .split('\n')
        .filter((f) => f.length > 0)
        .sort();

    console.log(`Found ${words.length} word files`);

    // ensure 0 through (wordFiles.length -1) .json exists
    try {
        const missingFiles = execSync(
            `for i in $(seq 0 $(($(find ${DIR} -name '[0-9]*.json' | wc -l) - 1))); do [ ! -f ${DIR}/$i.json ] && echo $i; done`,
            {
                encoding: 'utf-8',
            },
        )
            .trim()
            .split('\n')
            .filter((f) => f.length > 0);

        if (missingFiles.length > 0) {
            console.error(`Missing files: ${missingFiles.join(', ')}`);
        } else {
            console.log(`✓ All indexed files 0-${words.length - 1} exist`);
        }
    } catch (error) {
        console.log(`✓ All indexed files 0-${words.length - 1} exist`);
    }

    // ensure 5.json equals [ ...wordFiles ]
    try {
        const indexData = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf-8'));

        if (JSON.stringify(indexData) === JSON.stringify(words)) {
            console.log(`✓ ${OUTPUT_FILE} matches word files`);
        } else {
            console.error(`✗ ${OUTPUT_FILE} does not match word files`);
            console.error(`Expected ${words.length} words, got ${indexData.length}`);
        }
    } catch (error) {
        console.error(`✗ Could not read ${OUTPUT_FILE}`);
    }
}

validate();
