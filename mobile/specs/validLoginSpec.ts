export default function(spec) {
    spec.describe('Attempting to log in with valid credential', function() {
        spec.it('progresses the user past the login page', async function() {
            await spec.fillIn('LoginForm.email', 'Cavy');
            await spec.fillIn('LoginForm.password', 'User');
            await spec.press('LoginForm.loginBtn');
            await spec.exists('Group.screen');
        });
    });
}
