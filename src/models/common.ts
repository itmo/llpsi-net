/*
 *   LLPSI.net - Learning platform for Lingua Latina per se illustrata
 *   Copyright (C) 2020 Folke Will <folko@solhost.org>
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU Affero General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU Affero General Public License for more details.
 *
 *   You should have received a copy of the GNU Affero General Public License
 *   along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

export function dropSuffix(str: string, suffix: string): string {
    return str.substr(0, str.length - suffix.length);
}

export function changeSuffix(str: string, suffix: string, to: string): string {
    return dropSuffix(str, suffix) + to;
}

export function stripMacrons(str: string): string {
    str = str.replace(/ā/g, 'a');
    str = str.replace(/ē/g, 'e');
    str = str.replace(/ī/g, 'i');
    str = str.replace(/ō/g, 'o');
    str = str.replace(/ū/g, 'u');
    str = str.replace(/ȳ/g, 'y');

    str = str.replace(/Ā/g, 'A');
    str = str.replace(/Ē/g, 'E');
    str = str.replace(/Ī/g, 'I');
    str = str.replace(/Ō/g, 'O');
    str = str.replace(/Ū/g, 'U');
    str = str.replace(/Ȳ/g, 'Y');

    return str;
}

export function macronSort(a: string, b: string) {
    return stripMacrons(a) > stripMacrons(b) ? 1 : -1;
}

export function splitNoEmpty(str: string, sep: string): string[] {
    if (str == '') {
        return [];
    } else {
        return str.split(sep);
    }
}

export function randomElement<T>(elems: T[], pred?: ((x: T) => boolean)): T | undefined {
    let filtered: T[];
    if (pred) {
        filtered = elems.filter(pred);
    } else {
        filtered = elems;
    }

    if (filtered.length == 0) {
        return undefined;
    }

    return filtered[Math.floor(Math.random() * filtered.length)];
}
