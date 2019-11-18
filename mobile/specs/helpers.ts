export async function hasAGroup(component) {
    if (component.props.children.length < 1) {
        throw new Error(`No group for current user`);
    }
}
