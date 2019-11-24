export default function(spec) {
    spec.describe('Using the navbar', function() {
        spec.it('correctly switches screens', async function() {
            await spec.press('Navbar.Schedule');
            await spec.exists('Schedule.screen');
            await spec.press('Navbar.Messages');
            await spec.exists('Chat.screen');
            await spec.press('Navbar.Groups');
            await spec.exists('Group.screen');
            await spec.press('Navbar.Settings');
            await spec.exists('Settings.screen');
        });
    });
}
