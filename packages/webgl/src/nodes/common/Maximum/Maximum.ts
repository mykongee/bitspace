import { Output } from '@nodl/core';
import { max } from '@thi.ng/shader-ast';
import { combineLatest, map } from 'rxjs';

import { PrimSchema } from '../../../schemas/Prim/Prim';
import { ABPrimNode } from '../../internal/ABPrimNode/ABPrimNode';

export class Maximum extends ABPrimNode {
    name = 'Maximum';

    outputs = {
        output: new Output({
            name: 'Output',
            type: PrimSchema,
            observable: combineLatest([this.inputs.a, this.inputs.b]).pipe(map(inputs => max(...inputs)))
        })
    };
}