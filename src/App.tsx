// routing
import Routes from 'routes';

// project imports
import Locales from 'ui-component/Locales';
import NavigationScroll from 'layout/NavigationScroll';
import RTLLayout from 'ui-component/RTLLayout';
import Snackbar from 'ui-component/extended/Snackbar';
import ThemeCustomization from 'themes';

// auth provider
import { FirebaseProvider as AuthProvider } from 'contexts/FirebaseContext';

// ==============================|| APP ||============================== //

const App = () => (
    <ThemeCustomization>
        {/* RTL layout */}
        <RTLLayout>
            <Locales>
                <NavigationScroll>
                    <AuthProvider>
                        <>
                            <Routes />
                            <Snackbar />
                        </>
                    </AuthProvider>
                </NavigationScroll>
            </Locales>
        </RTLLayout>
    </ThemeCustomization>
);

export default App;
