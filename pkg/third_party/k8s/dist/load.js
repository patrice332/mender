import path from "node:path";
import { Include } from "cdk8s";
export const loadK8sGateway = (chart, id) => new Include(chart, id, {
    url: path.normalize(path.join(import.meta.dirname, "..", "assets", "standard-install.yaml")),
});
