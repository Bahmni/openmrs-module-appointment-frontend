import { configure } from "@storybook/react";
import { library, dom } from "@fortawesome/fontawesome-svg-core";

import { localReactConfig } from "../local-react-config";
localStorage.setItem("reactConfig", JSON.stringify(localReactConfig));
import {
    faPrint,
    faPlus,
    faMinus,
    faStop,
    faSearch,
    faTimes,
    faCheckSquare,
    faAngleDown, faPencilAlt, faTrashAlt
} from "@fortawesome/free-solid-svg-icons";

import { faSquare } from "@fortawesome/free-regular-svg-icons";
import {faCaretDown} from "@fortawesome/free-solid-svg-icons/faCaretDown";

library.add(faPrint, faPlus, faMinus, faStop, faSearch, faTimes, faCheckSquare, faSquare, faAngleDown, faPencilAlt, faTrashAlt, faCaretDown);

dom.watch();
configure(
    require.context("../react-components", true, /\.stories\.js$/),
    module
);
