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

import React, { ReactElement } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, withStyles } from '@material-ui/core';
import { DeclensionKnowledge } from '../../models/GrammarKnowledge';
import { AllCases, Casus } from '../../models/types/Casus';
import { Numerus } from '../../models/types/Numerus';
import { AllNounDeclensions, NounDeclension } from "../../models/types/NounDeclension";
import { Genus } from '../../models/types/Genus';
import { AllAdjectiveDeclensions } from '../../models/types/AdjectiveDeclension';

const CenteredCell = withStyles(() => ({
    root: {
        textAlign: 'center'
    },
  }))(TableCell);

const LeftCell = withStyles(() => ({
    root: {
        width: '20%'
    },
}))(TableCell);

const YesCell = withStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.success.main,
        borderLeft: '1px solid black'
    },
}))(CenteredCell);

const NoCell = withStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.error.main,
        borderLeft: '1px solid black'
    },
}))(CenteredCell);

export function DeclensionKnowledgeView(props: {knowledge: DeclensionKnowledge}): ReactElement {
    return (
        <Box mt={4}>
            <Typography component='h2' variant='h5'>Declension Details</Typography>

            <Box mt={1}>
                <Typography component='h3' variant='h6'>Cases</Typography>
                <CaseKnowledge knowledge={props.knowledge} />
            </Box>

            <Box mt={1}>
                <Typography component='h3' variant='h6'>Noun Declensions</Typography>
                <NounDeclensionKnowledge knowledge={props.knowledge} />
            </Box>

            <Box mt={1}>
                <Typography component='h3' variant='h6'>Adjective Declensions</Typography>
                <AdjectiveDeclensionKnowledge knowledge={props.knowledge} />
            </Box>

            <Box mt={1}>
                <Typography component='h3' variant='h6'>Pronoun Declensions</Typography>
                <PronounKnowledge knowledge={props.knowledge} />
            </Box>
        </Box>
    );
}

function CaseKnowledge(props: {knowledge: DeclensionKnowledge}) {
    return (
        <TableContainer>
            <Table size='small'>
                <TableHead>
                    <TableRow>
                        <LeftCell />
                        <CenteredCell colSpan={3}>
                            {Numerus.Singular}
                        </CenteredCell>
                        <CenteredCell>
                            {Numerus.Plural}
                        </CenteredCell>
                    </TableRow>
                    <TableRow>
                        <LeftCell>Casus</LeftCell>
                        <CenteredCell>m</CenteredCell>
                        <CenteredCell>f</CenteredCell>
                        <CenteredCell>n</CenteredCell>
                        <CenteredCell>m/f/n</CenteredCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {AllCases.map(casus =>
                        <CaseRow knowledge={props.knowledge} casus={casus} />
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

function CaseRow(props: {knowledge: DeclensionKnowledge, casus: Casus}) {
    const hasGenus = (genus: Genus): boolean => {
        const hasGenus = props.knowledge.cases.get(props.casus)?.genera.has(genus);
        const hasNumerus = props.knowledge.cases.get(props.casus)?.numeri.has(Numerus.Singular);
        if (!hasGenus || !hasNumerus) {
            return false;
        }
        return hasGenus && hasNumerus;
    }

    const hasPlural = props.knowledge.cases.get(props.casus)?.numeri.has(Numerus.Plural) ? true : false;

    return (
        <TableRow>
            <LeftCell>{props.casus}</LeftCell>
            <BoolCell y={hasGenus(Genus.Masculine)} />
            <BoolCell y={hasGenus(Genus.Femininum)} />
            <BoolCell y={hasGenus(Genus.Neuter)} />
            <BoolCell y={hasPlural} />
        </TableRow>
    );
}

function NounDeclensionKnowledge(props: {knowledge: DeclensionKnowledge}) {
    return (
        <TableContainer>
            <Table size='small'>
                <TableHead>
                    <TableRow>
                        <LeftCell>Declension</LeftCell>
                        <CenteredCell>m</CenteredCell>
                        <CenteredCell>f</CenteredCell>
                        <CenteredCell>n</CenteredCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {AllNounDeclensions.map(decl =>
                        <NounDeclensionRow knowledge={props.knowledge} declension={decl} />
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

function NounDeclensionRow(props: {knowledge: DeclensionKnowledge, declension: NounDeclension}) {
    function hasGenus(genus: Genus): boolean {
        const has = props.knowledge.nounDeclensions.get(props.declension)?.genera.has(genus);
        if (!has) {
            return false;
        }
        return has;
    }

    return (
        <TableRow>
            <LeftCell>{props.declension}</LeftCell>
            <BoolCell y={hasGenus(Genus.Masculine)} />
            <BoolCell y={hasGenus(Genus.Femininum)} />
            { props.declension == NounDeclension.E ?
                <TableCell /> :
                <BoolCell y={hasGenus(Genus.Neuter)} />
            }
        </TableRow>
    );
}

function AdjectiveDeclensionKnowledge(props: {knowledge: DeclensionKnowledge}) {
    return (
        <TableContainer>
            <Table size='small'>
                <TableHead>
                    <TableRow>
                        <LeftCell>Declension</LeftCell>
                        <CenteredCell>m / f / n</CenteredCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {AllAdjectiveDeclensions.map(decl =>
                        <TableRow>
                            <LeftCell>{decl}</LeftCell>
                            <BoolCell y={props.knowledge.adjectiveDeclensions.has(decl)} />
                        </TableRow>
                    )}
                    <TableRow>
                        <LeftCell>Comparatives</LeftCell>
                        <BoolCell y={props.knowledge.comparative} />
                    </TableRow>
                    <TableRow>
                        <LeftCell>Superlatives</LeftCell>
                        <BoolCell y={props.knowledge.superlative} />
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}

function PronounKnowledge(props: {knowledge: DeclensionKnowledge}) {
    return (
        <TableContainer>
            <Table size='small'>
                <TableHead>
                    <TableRow>
                        <LeftCell>Pronoun</LeftCell>
                        <CenteredCell>m/f/n</CenteredCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <LeftCell>is / ea / id</LeftCell>
                        <BoolCell y={props.knowledge.pronounIs} />
                    </TableRow>
                    <TableRow>
                        <LeftCell>hic / haec / hoc</LeftCell>
                        <BoolCell y={props.knowledge.pronounHic} />
                    </TableRow>
                    <TableRow>
                        <LeftCell>ille / illa / illud</LeftCell>
                        <BoolCell y={props.knowledge.pronounIlle} />
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}

function BoolCell(props: { y: boolean }) {
    if (props.y) {
        return <YesCell />;
    } else {
        return <NoCell />;
    }
}
