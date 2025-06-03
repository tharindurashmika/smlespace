import { registerWidget, registerLink, registerUI, IContextProvider, enableLocalization, registerCustomWidgetTemplate, } from './uxp';
import BundleConfig from '../bundle.json';
import './styles.scss';
import SmplrspaceProject from "./prod/smplrspace";

registerWidget({
    id: "smplr-space-project",
    widget: SmplrspaceProject,
    configs: {
        layout: {
            // w: 12,
            // h: 12,
            // minH: 12,
            // minW: 12
        }
    }
});