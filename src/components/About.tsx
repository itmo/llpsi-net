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

import React from 'react';
import Typography from "@material-ui/core/Typography";

export const About: React.FunctionComponent = () =>
  <section>
    <Typography component='h1' variant='h4'>About LLPSI.net</Typography>
    <Typography variant='body1'>
        <p>
            This will become a training platform for the book <Typography component='em'>Lingua Latina per se Illustra</Typography>.
        </p>
        <p>
          As of now, the words up to chapter 12 are included. More will be added as I progress with LLPSI.
        </p>
    </Typography>
  </section>
