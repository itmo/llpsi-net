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
    str = str.replace('ā', 'a');
    str = str.replace('ē', 'e');
    str = str.replace('ī', 'i');
    str = str.replace('ō', 'o');
    str = str.replace('ū', 'u');
    str = str.replace('ȳ', 'y');

    str = str.replace('Ā', 'A');
    str = str.replace('Ē', 'E');
    str = str.replace('Ī', 'I');
    str = str.replace('Ō', 'O');
    str = str.replace('Ū', 'U');
    str = str.replace('Ȳ', 'Y');

    return str;
}

export function macronSort(a: string, b: string) {
    return stripMacrons(a) > stripMacrons(b) ? 1 : -1;
}
