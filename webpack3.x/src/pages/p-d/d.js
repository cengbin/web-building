import * as utils from '../../utils';

console.log('app2', utils.dataType({})); // Object

import _ from 'lodash';

console.log('app2', _.chunk(['a', 'b', 'c', 'd'], 2)); // ['a', 'b'] ['c', 'd']