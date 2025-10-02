import DashboardUi from '@ui/app/dashboard/Dashboard.ui';
import AddProductUi from '@ui/app/product/AddProduct.ui';
import ProductDetailUi from '@ui/app/product/ProductDetail.ui';
import ProductsUi from '@ui/app/product/Products.ui';
import SplashUi from '@ui/intro/splash/Splash.ui';
import routes from './routes';
import stacks from './stacks';

export default [
  {
    stack: stacks.ONBOARDING,
    route: routes.splash,
    screen: SplashUi,
    showHeader: false,
    hideHeaderTitle: false,
    title: '',
  },
  {
    stack: stacks.APP,
    route: routes.dashboard,
    screen: DashboardUi,
    showHeader: false,
    hideHeaderTitle: false,
    title: '',
  },

  // Product
  {
    stack: stacks.APP,
    route: routes.products,
    screen: ProductsUi,
    showHeader: false,
    hideHeaderTitle: false,
    title: '',
  },
  {
    stack: stacks.APP,
    route: routes.productsDetail,
    screen: ProductDetailUi,
    showHeader: false,
    hideHeaderTitle: false,
    title: '',
  },
  {
    stack: stacks.APP,
    route: routes.addProduct,
    screen: AddProductUi,
    showHeader: false,
    hideHeaderTitle: false,
    title: '',
  },
];
