import routes from '@core/router/routes';
import { useProductStore } from '@core/store/product-store';
import { colors } from '@core/styles/colors';
import { navigate } from '@core/utils/helpers';
import { rfs, s } from '@core/utils/scale';
import { Package, Trash2 } from 'lucide-react-native';
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProductsUi() {
  const { products, removeProduct, getProductCount } = useProductStore();

  const handleDeleteProduct = (id: string, name: string) => {
    Alert.alert(
      'Delete Product',
      `Are you sure you want to delete "${name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => removeProduct(id),
        },
      ],
    );
  };

  const handleProductPress = (productId: string) => {
    navigate(routes.productsDetail, {
      productId: productId,
    });
  };

  const renderProduct = ({ item }: any) => (
    <Pressable
      style={styles.productCard}
      onPress={() => handleProductPress(item.id)}
    >
      <Image source={{ uri: item.photo }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteProduct(item.id, item.name)}
      >
        <Trash2 size={20} color={'white'} />
      </TouchableOpacity>
    </Pressable>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Package size={64} color={colors.primary} />
      <Text style={styles.emptyTitle}>No Products Yet</Text>
      <Text style={styles.emptySubtitle}>
        Add your first product to get started!
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Products</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{getProductCount()}/5</Text>
        </View>
      </View>

      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={renderProduct}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: s(20),
    paddingVertical: s(16),
    borderBottomWidth: s(1),
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: rfs(28),
    fontWeight: 'bold',
    color: colors.text,
  },
  countBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: s(12),
    paddingVertical: s(6),
    borderRadius: s(16),
  },
  countText: {
    color: colors.text,
    fontSize: rfs(14),
    fontWeight: '600',
  },
  listContainer: {
    padding: s(20),
    flexGrow: 1,
  },
  productCard: {
    backgroundColor: colors.card,
    borderRadius: s(12),
    marginBottom: s(16),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: s(2),
    },
    shadowOpacity: 0.1,
    shadowRadius: s(4),
    elevation: s(3),
  },
  productImage: {
    width: '100%',
    height: s(180),
    backgroundColor: colors.border,
  },
  productInfo: {
    padding: s(16),
  },
  productName: {
    fontSize: rfs(18),
    fontWeight: '600',
    color: colors.text,
    marginBottom: s(8),
  },
  productPrice: {
    fontSize: rfs(16),
    fontWeight: '700',
    color: colors.primary,
    marginBottom: s(12),
  },
  deleteButton: {
    position: 'absolute',
    top: s(12),
    right: s(12),
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: s(8),
    borderRadius: s(20),
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: s(60),
  },
  emptyTitle: {
    fontSize: rfs(24),
    fontWeight: '600',
    color: colors.text,
    marginTop: s(16),
    marginBottom: s(8),
  },
  emptySubtitle: {
    fontSize: rfs(16),
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: s(24),
  },
});
