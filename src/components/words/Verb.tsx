/*
 *   LLPSI.net - Learning platform for Lingua Latina per se illustrata
 *   Copyright (C) 2021 Folke Will <folko@solhost.org>
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

import { Box, Table, TableBody, TableCell, TableCellProps, TableHead, Typography, withStyles } from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow/TableRow";
import React from "react";
import { DeponentType, VerbConjugation } from "../../models/conjugations/Conjugation";
import { LaVerb } from "../../models/conjugations/LaVerb";
import { Verb } from "../../models/words/Verb";

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

export function VerbEntry(props: { verb: Verb }) {
    const c = props.verb.conjugate();

    return (
        <React.Fragment>
            <Table size='small'>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={5}>
                            Conjugation of {c.lemma}
                            <Box component='div' display='block'>
                                { c.titleParts.join(', ') }
                            </Box>
                        </TableCell>
                    </TableRow>
                </TableHead>
                { c.deponent == DeponentType.None ?
                    <NoDeponTable conj={c} /> :
                    <DeponTable conj={c} />
                }
            </Table>
        </React.Fragment>
    );
};

function NoDeponTable(props: {conj: VerbConjugation}) {
    const c = props.conj;

    return (
        <TableBody>
            <TableRow>
                <TableCell></TableCell>
                <Heading colSpan={2} align='center'>Active</Heading>
                <Heading colSpan={2} align='center'>Passive</Heading>
            </TableRow>
            <PresentTable conj={c}/>
            <ImperfectTable conj={c}/>
            <FutureTable conj={c} />
            <PerfectTable conj={c} />
            <PluperfectTable conj={c} />
            <FutureperfectTable conj={c} />
        </TableBody>
    );
}

function PresentTable(props: {conj: VerbConjugation}) {
    const c = props.conj;

    return (<React.Fragment>
        <TableRow>
            <Heading rowSpan={11} style={{writingMode: 'vertical-lr'}}>Present</Heading>
            <Heading>Indicative</Heading>
            <Heading>Subjunctive</Heading>
            <Heading>Indicative</Heading>
            <Heading>Subjunctive</Heading>
        </TableRow>
        <TableRow>
            <TableCell><ShowForms forms={c.active.indicative.present?.s1} /></TableCell>
            <TableCell><ShowForms forms={c.active.subjunctive.present?.s1} /></TableCell>
            <TableCell><ShowForms forms={c.passive.indicative.present?.s1} /></TableCell>
            <TableCell><ShowForms forms={c.passive.subjunctive.present?.s1} /></TableCell>
        </TableRow>
        <TableRow>
            <TableCell><ShowForms forms={c.active.indicative.present?.s2} /></TableCell>
            <TableCell><ShowForms forms={c.active.subjunctive.present?.s2} /></TableCell>
            <TableCell><ShowForms forms={c.passive.indicative.present?.s2} /></TableCell>
            <TableCell><ShowForms forms={c.passive.subjunctive.present?.s2} /></TableCell>
        </TableRow>
        <TableRow>
            <TableCell><ShowForms forms={c.active.indicative.present?.s3} /></TableCell>
            <TableCell><ShowForms forms={c.active.subjunctive.present?.s3} /></TableCell>
            <TableCell><ShowForms forms={c.passive.indicative.present?.s3} /></TableCell>
            <TableCell><ShowForms forms={c.passive.subjunctive.present?.s3} /></TableCell>
        </TableRow>
        <TableRow>
            <TableCell><ShowForms forms={c.active.indicative.present?.p1} /></TableCell>
            <TableCell><ShowForms forms={c.active.subjunctive.present?.p1} /></TableCell>
            <TableCell><ShowForms forms={c.passive.indicative.present?.p1} /></TableCell>
            <TableCell><ShowForms forms={c.passive.subjunctive.present?.p1} /></TableCell>
        </TableRow>
        <TableRow>
            <TableCell><ShowForms forms={c.active.indicative.present?.p2} /></TableCell>
            <TableCell><ShowForms forms={c.active.subjunctive.present?.p2} /></TableCell>
            <TableCell><ShowForms forms={c.passive.indicative.present?.p2} /></TableCell>
            <TableCell><ShowForms forms={c.passive.subjunctive.present?.p2} /></TableCell>
        </TableRow>
        <TableRow>
            <TableCell><ShowForms forms={c.active.indicative.present?.p3} /></TableCell>
            <TableCell><ShowForms forms={c.active.subjunctive.present?.p3} /></TableCell>
            <TableCell><ShowForms forms={c.passive.indicative.present?.p3} /></TableCell>
            <TableCell><ShowForms forms={c.passive.subjunctive.present?.p3} /></TableCell>
        </TableRow>
        <TableRow>
            <Heading>Imperatives</Heading>
            <TableCell>
                <JoinForms forms={[c.active.imperative.present?.s2, c.active.imperative.present?.p2]} />
            </TableCell>
            <TableCell colSpan={2}>
                <JoinForms forms={[c.passive.imperative.present?.s2, c.passive.imperative.present?.p2]} />
            </TableCell>
        </TableRow>
        <TableRow>
            <Heading>Infinitives</Heading>
            <TableCell><JoinForms forms={[c.active.indicative.present?.infinitive]}/></TableCell>
            <TableCell colSpan={2}><JoinForms forms={[c.passive.indicative.present?.infinitive]}/></TableCell>
        </TableRow>
        <TableRow>
            <Heading>Gerund</Heading>
            <TableCell><JoinForms forms={[c.gerund.acc, c.gerund.gen, c.gerund.abl]}/></TableCell>
            <Heading>Gerundive</Heading>
            <TableCell><ShowForms forms={c.participles.futurePassive} /></TableCell>
        </TableRow>
        <TableRow>
            <Heading>Participle</Heading>
            <TableCell colSpan={3}>
                <ShowForms forms={c.participles.presentActive} />
            </TableCell>
        </TableRow>
    </React.Fragment>);
}

function ImperfectTable(props: {conj: VerbConjugation}) {
    const c = props.conj;

    return (<React.Fragment>
        <TableRow>
            <Heading rowSpan={7} style={{writingMode: 'vertical-lr'}}>Imperfect</Heading>
            <Heading>Indicative</Heading>
            <Heading>Subjunctive</Heading>
            <Heading>Indicative</Heading>
            <Heading>Subjunctive</Heading>
        </TableRow>
        <TableRow>
            <TableCell><ShowForms forms={c.active.indicative.imperfect?.s1} /></TableCell>
            <TableCell><ShowForms forms={c.active.subjunctive.imperfect?.s1} /></TableCell>
            <TableCell><ShowForms forms={c.passive.indicative.imperfect?.s1} /></TableCell>
            <TableCell><ShowForms forms={c.passive.subjunctive.imperfect?.s1} /></TableCell>
        </TableRow>
        <TableRow>
            <TableCell><ShowForms forms={c.active.indicative.imperfect?.s2} /></TableCell>
            <TableCell><ShowForms forms={c.active.subjunctive.imperfect?.s2} /></TableCell>
            <TableCell><ShowForms forms={c.passive.indicative.imperfect?.s2} /></TableCell>
            <TableCell><ShowForms forms={c.passive.subjunctive.imperfect?.s2} /></TableCell>
        </TableRow>
        <TableRow>
            <TableCell><ShowForms forms={c.active.indicative.imperfect?.s3} /></TableCell>
            <TableCell><ShowForms forms={c.active.subjunctive.imperfect?.s3} /></TableCell>
            <TableCell><ShowForms forms={c.passive.indicative.imperfect?.s3} /></TableCell>
            <TableCell><ShowForms forms={c.passive.subjunctive.imperfect?.s3} /></TableCell>
        </TableRow>
        <TableRow>
            <TableCell><ShowForms forms={c.active.indicative.imperfect?.p1} /></TableCell>
            <TableCell><ShowForms forms={c.active.subjunctive.imperfect?.p1} /></TableCell>
            <TableCell><ShowForms forms={c.passive.indicative.imperfect?.p1} /></TableCell>
            <TableCell><ShowForms forms={c.passive.subjunctive.imperfect?.p1} /></TableCell>
        </TableRow>
        <TableRow>
            <TableCell><ShowForms forms={c.active.indicative.imperfect?.p2} /></TableCell>
            <TableCell><ShowForms forms={c.active.subjunctive.imperfect?.p2} /></TableCell>
            <TableCell><ShowForms forms={c.passive.indicative.imperfect?.p2} /></TableCell>
            <TableCell><ShowForms forms={c.passive.subjunctive.imperfect?.p2} /></TableCell>
        </TableRow>
        <TableRow>
            <TableCell><ShowForms forms={c.active.indicative.imperfect?.p3} /></TableCell>
            <TableCell><ShowForms forms={c.active.subjunctive.imperfect?.p3} /></TableCell>
            <TableCell><ShowForms forms={c.passive.indicative.imperfect?.p3} /></TableCell>
            <TableCell><ShowForms forms={c.passive.subjunctive.imperfect?.p3} /></TableCell>
        </TableRow>
    </React.Fragment>);
}

function FutureTable(props: {conj: VerbConjugation}) {
    const c = props.conj;

    return (<React.Fragment>
        <TableRow>
            <Heading rowSpan={9} style={{writingMode: 'vertical-lr'}}>Future</Heading>
            <Heading>Indicative</Heading>
            <Heading>Imperative</Heading>
            <Heading>Indicative</Heading>
            <Heading>Imperative</Heading>
        </TableRow>
        <TableRow>
            <TableCell><ShowForms forms={c.active.indicative.future?.s1} /></TableCell>
            <TableCell><ShowForms forms={c.active.imperative.future?.s1} /></TableCell>
            <TableCell><ShowForms forms={c.passive.indicative.future?.s1} /></TableCell>
            <TableCell><ShowForms forms={c.passive.imperative.future?.s1} /></TableCell>
        </TableRow>
        <TableRow>
        <TableCell><ShowForms forms={c.active.indicative.future?.s2} /></TableCell>
            <TableCell><ShowForms forms={c.active.imperative.future?.s2} /></TableCell>
            <TableCell><ShowForms forms={c.passive.indicative.future?.s2} /></TableCell>
            <TableCell><ShowForms forms={c.passive.imperative.future?.s2} /></TableCell>
        </TableRow>
        <TableRow>
        <TableCell><ShowForms forms={c.active.indicative.future?.s3} /></TableCell>
            <TableCell><ShowForms forms={c.active.imperative.future?.s3} /></TableCell>
            <TableCell><ShowForms forms={c.passive.indicative.future?.s3} /></TableCell>
            <TableCell><ShowForms forms={c.passive.imperative.future?.s3} /></TableCell>
        </TableRow>
        <TableRow>
        <TableCell><ShowForms forms={c.active.indicative.future?.p1} /></TableCell>
            <TableCell><ShowForms forms={c.active.imperative.future?.p1} /></TableCell>
            <TableCell><ShowForms forms={c.passive.indicative.future?.p1} /></TableCell>
            <TableCell><ShowForms forms={c.passive.imperative.future?.p1} /></TableCell>
        </TableRow>
        <TableRow>
        <TableCell><ShowForms forms={c.active.indicative.future?.p2} /></TableCell>
            <TableCell><ShowForms forms={c.active.imperative.future?.p2} /></TableCell>
            <TableCell><ShowForms forms={c.passive.indicative.future?.p2} /></TableCell>
            <TableCell><ShowForms forms={c.passive.imperative.future?.p2} /></TableCell>
        </TableRow>
        <TableRow>
        <TableCell><ShowForms forms={c.active.indicative.future?.p3} /></TableCell>
            <TableCell><ShowForms forms={c.active.imperative.future?.p3} /></TableCell>
            <TableCell><ShowForms forms={c.passive.indicative.future?.p3} /></TableCell>
            <TableCell><ShowForms forms={c.passive.imperative.future?.p3} /></TableCell>
        </TableRow>
        <TableRow>
            <Heading>Infinitives</Heading>
            <TableCell><JoinForms forms={[c.active.indicative.future?.infinitive]}/></TableCell>
            <TableCell colSpan={2}><JoinForms forms={[c.passive.indicative.future?.infinitive]}/></TableCell>
        </TableRow>
        <TableRow>
            <Heading>Participle</Heading>
            <TableCell>
                <ShowForms forms={c.participles.futureActive} />
            </TableCell>
            <TableCell colSpan={2}/>
        </TableRow>
    </React.Fragment>);
}

function PerfectTable(props: {conj: VerbConjugation}) {
    const c = props.conj;

    return (<React.Fragment>
        <TableRow>
            <Heading rowSpan={9} style={{writingMode: 'vertical-lr'}}>Perfect</Heading>
            <Heading>Indicative</Heading>
            <Heading>Subjunctive</Heading>
            <Heading>Indicative</Heading>
            <Heading>Subjunctive</Heading>
        </TableRow>
        <TableRow>
            <TableCell><ShowForms forms={c.active.indicative.perfect?.s1} /></TableCell>
            <TableCell><ShowForms forms={c.active.subjunctive.perfect?.s1} /></TableCell>
            <TableCell rowSpan={6}><ShowForms prefix='Form of' forms={c.participles.perfectPassive} suffix='+ sum'/></TableCell>
            <TableCell rowSpan={6}><ShowForms prefix='Form of' forms={c.participles.perfectPassive} suffix='+ sim'/></TableCell>
        </TableRow>
        <TableRow>
            <TableCell><ShowForms forms={c.active.indicative.perfect?.s2} /></TableCell>
            <TableCell><ShowForms forms={c.active.subjunctive.perfect?.s2} /></TableCell>
        </TableRow>
        <TableRow>
            <TableCell><ShowForms forms={c.active.indicative.perfect?.s3} /></TableCell>
            <TableCell><ShowForms forms={c.active.subjunctive.perfect?.s3} /></TableCell>
        </TableRow>
        <TableRow>
            <TableCell><ShowForms forms={c.active.indicative.perfect?.p1} /></TableCell>
            <TableCell><ShowForms forms={c.active.subjunctive.perfect?.p1} /></TableCell>
        </TableRow>
        <TableRow>
            <TableCell><ShowForms forms={c.active.indicative.perfect?.p2} /></TableCell>
            <TableCell><ShowForms forms={c.active.subjunctive.perfect?.p2} /></TableCell>
        </TableRow>
        <TableRow>
            <TableCell><ShowForms forms={c.active.indicative.perfect?.p3} /></TableCell>
            <TableCell><ShowForms forms={c.active.subjunctive.perfect?.p3} /></TableCell>
        </TableRow>
        <TableRow>
            <Heading>Infinitives</Heading>
            <TableCell><JoinForms forms={[c.active.indicative.perfect?.infinitive]}/></TableCell>
            <TableCell colSpan={2}><JoinForms forms={[c.passive.indicative.perfect?.infinitive]}/></TableCell>
        </TableRow>
        <TableRow>
            <Heading>Participle</Heading>
            <TableCell />
            <TableCell colSpan={2}>
                <ShowForms forms={c.participles.perfectPassive} />
            </TableCell>
        </TableRow>
    </React.Fragment>);
}

function PluperfectTable(props: {conj: VerbConjugation}) {
    const c = props.conj;

    return (<React.Fragment>
        <TableRow>
            <Heading rowSpan={7} style={{writingMode: 'vertical-lr'}}>Pluperfect</Heading>
            <Heading>Indicative</Heading>
            <Heading>Subjunctive</Heading>
            <Heading>Indicative</Heading>
            <Heading>Subjunctive</Heading>
        </TableRow>
        <TableRow>
            <TableCell><ShowForms forms={c.active.indicative.pluperfect?.s1} /></TableCell>
            <TableCell><ShowForms forms={c.active.subjunctive.pluperfect?.s1} /></TableCell>
            <TableCell rowSpan={6}><ShowForms prefix='Form of' forms={c.participles.perfectPassive} suffix='+ eram'/></TableCell>
            <TableCell rowSpan={6}><ShowForms prefix='Form of' forms={c.participles.perfectPassive} suffix='+ essem'/></TableCell>
        </TableRow>
        <TableRow>
            <TableCell><ShowForms forms={c.active.indicative.pluperfect?.s2} /></TableCell>
            <TableCell><ShowForms forms={c.active.subjunctive.pluperfect?.s2} /></TableCell>
        </TableRow>
        <TableRow>
            <TableCell><ShowForms forms={c.active.indicative.pluperfect?.s3} /></TableCell>
            <TableCell><ShowForms forms={c.active.subjunctive.pluperfect?.s3} /></TableCell>
        </TableRow>
        <TableRow>
            <TableCell><ShowForms forms={c.active.indicative.pluperfect?.p1} /></TableCell>
            <TableCell><ShowForms forms={c.active.subjunctive.pluperfect?.p1} /></TableCell>
        </TableRow>
        <TableRow>
            <TableCell><ShowForms forms={c.active.indicative.pluperfect?.p2} /></TableCell>
            <TableCell><ShowForms forms={c.active.subjunctive.pluperfect?.p2} /></TableCell>
        </TableRow>
        <TableRow>
            <TableCell><ShowForms forms={c.active.indicative.pluperfect?.p3} /></TableCell>
            <TableCell><ShowForms forms={c.active.subjunctive.pluperfect?.p3} /></TableCell>
        </TableRow>
    </React.Fragment>);
}

function FutureperfectTable(props: {conj: VerbConjugation}) {
    const c = props.conj;

    return (<React.Fragment>
        <TableRow>
            <Heading rowSpan={7} style={{writingMode: 'vertical-lr'}}>Future Perfect</Heading>
            <Heading colSpan={2}>Indicative</Heading>
            <Heading colSpan={2}>Indicative</Heading>
        </TableRow>
        <TableRow>
            <TableCell colSpan={2}><ShowForms forms={c.active.indicative.futureperfect?.s1} /></TableCell>
            <TableCell colSpan={2} rowSpan={6}><ShowForms prefix='Form of' forms={c.participles.perfectPassive} suffix=' + erō'/></TableCell>
        </TableRow>
        <TableRow>
            <TableCell colSpan={2}><ShowForms forms={c.active.indicative.futureperfect?.s2} /></TableCell>
        </TableRow>
        <TableRow>
            <TableCell colSpan={2}><ShowForms forms={c.active.indicative.futureperfect?.s3} /></TableCell>
        </TableRow>
        <TableRow>
            <TableCell colSpan={2}><ShowForms forms={c.active.indicative.futureperfect?.p1} /></TableCell>
        </TableRow>
        <TableRow>
            <TableCell colSpan={2}><ShowForms forms={c.active.indicative.futureperfect?.p2} /></TableCell>
        </TableRow>
        <TableRow>
            <TableCell colSpan={2}><ShowForms forms={c.active.indicative.futureperfect?.p3} /></TableCell>
        </TableRow>
    </React.Fragment>);
}

function DeponTable(props: {conj: VerbConjugation}) {
    const c = props.conj;

    return (
        <TableBody>
            <TableRow>
                <Heading rowSpan={7} style={{writingMode: 'vertical-lr'}}>Present</Heading>
                <Heading>Indicative</Heading>
                <Heading>Subjunctive</Heading>
                <Heading>Imperative</Heading>
                <Heading>Infinite</Heading>
            </TableRow>
            <TableRow>
                <TableCell><ShowForms forms={c.active.indicative.present?.s1} /></TableCell>
                <TableCell><ShowForms forms={c.active.subjunctive.present?.s1} /></TableCell>
                <TableCell rowSpan={6}><JoinForms forms={[c.active.imperative.present?.s2, c.active.imperative.present?.p2]} /></TableCell>
                <Heading>Infinitive:</Heading>
            </TableRow>
            <TableRow>
                <TableCell><ShowForms forms={c.active.indicative.present?.s2} /></TableCell>
                <TableCell><ShowForms forms={c.active.subjunctive.present?.s2} /></TableCell>
                <TableCell><ShowForms forms={c.active.indicative.present?.infinitive} /></TableCell>
            </TableRow>
            <TableRow>
                <TableCell><ShowForms forms={c.active.indicative.present?.s3} /></TableCell>
                <TableCell><ShowForms forms={c.active.subjunctive.present?.s3} /></TableCell>
                <Heading>Gerund / Gerundive:</Heading>
            </TableRow>
            <TableRow>
                <TableCell><ShowForms forms={c.active.indicative.present?.p1} /></TableCell>
                <TableCell><ShowForms forms={c.active.subjunctive.present?.p1} /></TableCell>
                <TableCell>
                    <JoinForms forms={[c.gerund.acc, c.participles.futurePassive]}/>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell><ShowForms forms={c.active.indicative.present?.p2} /></TableCell>
                <TableCell><ShowForms forms={c.active.subjunctive.present?.p2} /></TableCell>
                <Heading>Participle:</Heading>
            </TableRow>
            <TableRow>
                <TableCell><ShowForms forms={c.active.indicative.present?.p3} /></TableCell>
                <TableCell><ShowForms forms={c.active.subjunctive.present?.p3} /></TableCell>
                <TableCell><ShowForms forms={c.participles.presentActive} /></TableCell>
            </TableRow>

            <TableRow>
                <Heading rowSpan={7} style={{writingMode: 'vertical-lr'}}>Imperfect</Heading>
                <Heading>Indicative</Heading>
                <Heading>Subjunctive</Heading>
                <Heading>Imperative</Heading>
                <Heading>Infinite</Heading>
            </TableRow>
            <TableRow>
                <TableCell><ShowForms forms={c.active.indicative.imperfect?.s1} /></TableCell>
                <TableCell><ShowForms forms={c.active.subjunctive.imperfect?.s1} /></TableCell>
                <TableCell />
                <TableCell />
            </TableRow>
            <TableRow>
                <TableCell><ShowForms forms={c.active.indicative.imperfect?.s2} /></TableCell>
                <TableCell><ShowForms forms={c.active.subjunctive.imperfect?.s2} /></TableCell>
                <TableCell />
                <TableCell />
            </TableRow>
            <TableRow>
                <TableCell><ShowForms forms={c.active.indicative.imperfect?.s3} /></TableCell>
                <TableCell><ShowForms forms={c.active.subjunctive.imperfect?.s3} /></TableCell>
                <TableCell />
                <TableCell />
            </TableRow>
            <TableRow>
                <TableCell><ShowForms forms={c.active.indicative.imperfect?.p1} /></TableCell>
                <TableCell><ShowForms forms={c.active.subjunctive.imperfect?.p1} /></TableCell>
                <TableCell />
                <TableCell />
            </TableRow>
            <TableRow>
                <TableCell><ShowForms forms={c.active.indicative.imperfect?.p2} /></TableCell>
                <TableCell><ShowForms forms={c.active.subjunctive.imperfect?.p2} /></TableCell>
                <TableCell />
                <TableCell />
            </TableRow>
            <TableRow>
                <TableCell><ShowForms forms={c.active.indicative.imperfect?.p3} /></TableCell>
                <TableCell><ShowForms forms={c.active.subjunctive.imperfect?.p3} /></TableCell>
                <TableCell />
                <TableCell />
            </TableRow>

            <TableRow>
                <Heading rowSpan={7} style={{writingMode: 'vertical-lr'}}>Future</Heading>
                <Heading>Indicative</Heading>
                <TableCell />
                <Heading>Imperative</Heading>
                <Heading>Infinite</Heading>
            </TableRow>
            <TableRow>
                <TableCell><ShowForms forms={c.active.indicative.future?.s1} /></TableCell>
                <TableCell />
                <TableCell><ShowForms forms={c.active.imperative.future?.s1} /></TableCell>
                <Heading>Infinitive:</Heading>
            </TableRow>
            <TableRow>
                <TableCell><ShowForms forms={c.active.indicative.future?.s2} /></TableCell>
                <TableCell />
                <TableCell><ShowForms forms={c.active.imperative.future?.s2} /></TableCell>
                <TableCell><ShowForms forms={c.active.indicative.future?.infinitive} /></TableCell>
            </TableRow>
            <TableRow>
                <TableCell><ShowForms forms={c.active.indicative.future?.s3} /></TableCell>
                <TableCell />
                <TableCell><ShowForms forms={c.active.imperative.future?.s3} /></TableCell>
                <Heading>Participle:</Heading>
            </TableRow>
            <TableRow>
                <TableCell><ShowForms forms={c.active.indicative.future?.p1} /></TableCell>
                <TableCell />
                <TableCell><ShowForms forms={c.active.imperative.future?.p1} /></TableCell>
                <TableCell><ShowForms forms={c.participles.futureActive} /></TableCell>
            </TableRow>
            <TableRow>
                <TableCell><ShowForms forms={c.active.indicative.future?.p2} /></TableCell>
                <TableCell />
                <TableCell><ShowForms forms={c.active.imperative.future?.p2} /></TableCell>
                <TableCell />
            </TableRow>
            <TableRow>
                <TableCell><ShowForms forms={c.active.indicative.future?.p3} /></TableCell>
                <TableCell />
                <TableCell><ShowForms forms={c.active.imperative.future?.p3} /></TableCell>
                <TableCell />
            </TableRow>

            <TableRow>
                <Heading rowSpan={7} style={{writingMode: 'vertical-lr'}}>Perfect</Heading>
                <Heading>Indicative</Heading>
                <Heading>Subjunctive</Heading>
                <Heading colSpan={2}>Infinite</Heading>
            </TableRow>
            <TableRow>
                <TableCell rowSpan={6}><ShowForms prefix='Form of' forms={c.participles.perfectActive} suffix='+ sum'/></TableCell>
                <TableCell rowSpan={6}><ShowForms prefix='Form of' forms={c.participles.perfectActive} suffix='+ sim'/></TableCell>
                <Heading>Infinitive:</Heading>
                <TableCell rowSpan={6} />
            </TableRow>
            <TableRow>
                <TableCell><ShowForms forms={c.active.indicative.perfect?.infinitive} /></TableCell>
            </TableRow>
            <TableRow>
                <Heading>Participle:</Heading>
            </TableRow>
            <TableRow>
                <TableCell><ShowForms forms={c.participles.perfectActive} /></TableCell>
            </TableRow>
            <TableRow>
                <TableCell />
            </TableRow>
            <TableRow>
                <TableCell />
            </TableRow>

            <TableRow>
                <Heading rowSpan={7} style={{writingMode: 'vertical-lr'}}>Pluperfect</Heading>
                <Heading>Indicative</Heading>
                <Heading colSpan={3}>Subjunctive</Heading>
            </TableRow>
            <TableRow>
                <TableCell rowSpan={6}><ShowForms prefix='Form of' forms={c.participles.perfectActive} suffix='+ eram'/></TableCell>
                <TableCell rowSpan={6}><ShowForms prefix='Form of' forms={c.participles.perfectActive} suffix='+ essem'/></TableCell>
                <TableCell colSpan={2} rowSpan={6} />
            </TableRow>
            <TableRow />
            <TableRow />
            <TableRow />
            <TableRow />
            <TableRow />

            <TableRow>
                <Heading rowSpan={7} style={{writingMode: 'vertical-lr'}}>Future Perfect</Heading>
                <Heading colSpan={4}>Indicative</Heading>
            </TableRow>
            <TableRow>
                <TableCell colSpan={4} rowSpan={6}><ShowForms prefix='Form of' forms={c.participles.perfectActive} suffix=' + erō'/></TableCell>
            </TableRow>
            <TableRow />
            <TableRow />
            <TableRow />
            <TableRow />
            <TableRow />
        </TableBody>
    );
}

function ShowForms(props: {forms: string[] | undefined, prefix?: string, suffix?: string}) {
    return (
        <React.Fragment>
            {props.forms?.map(f => LaVerb.remove_links(f)).map(form =>
                <Box component='div' display='block' lang='la'>
                    {props.prefix && <Box component='span' display='inline' lang='en'>{props.prefix} </Box>}
                    {form}
                    {props.suffix && <Box component='span' display='inline' lang='en'> {props.suffix}</Box>}
                </Box>
            )}
        </React.Fragment>
    );
}

function JoinForms(props: {forms: (string[] | undefined)[]}) {
    const forms = props.forms?.map(fs => {
        if (fs) {
            return fs.map(f => LaVerb.remove_links(f));
        } else {
            return [];
        }
    }).filter(fs => fs.length > 0);

    return (
        <Box component='div' display='block' lang='la'>
            {forms.join(', ')}
        </Box>
    );
}

function Heading(props: React.PropsWithChildren<TableCellProps>) {
    if (props.style) {
        props.style.fontWeight = 'bold';
    } else {
        props.style = {fontWeight: 'bold'};
    }

    return (
        <TableCell variant='head' {...props}>{props.children}</TableCell>
    );
}