export default function(spec) {
    spec.describe('Refreshing courses', function() {
        spec.it('displays a list of courses', async function() {
            await spec.exists('Navbar.Schedule');
            await spec.press('Navbar.Schedule');
        });
    });
}
