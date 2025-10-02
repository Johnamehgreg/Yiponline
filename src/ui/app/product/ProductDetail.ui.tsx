import { Product, useProductStore } from '@core/store/product-store';
import { colors } from '@core/styles/colors';
import { goBack } from '@core/utils/helpers';
import { rfs, s } from '@core/utils/scale';
import { useRoute } from '@react-navigation/native';
import { ArrowLeft, Calendar, DollarSign, Trash2 } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function ProductDetailUi() {
  const router = useRoute<any>();
  const id = router?.params?.productId as string;

  const { products, removeProduct } = useProductStore();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === id);
    setProduct(foundProduct || null);
  }, [id, products]);

  const handleDelete = () => {
    if (!product) return;

    Alert.alert(
      'Delete Product',
      `Are you sure you want to delete "${product.name}"? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            removeProduct(product.id);
            goBack();
          },
        },
      ],
    );
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => goBack()}>
            <ArrowLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Product Not Found</Text>
        </View>
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>
            This product could not be found.
          </Text>
          <TouchableOpacity
            style={styles.goBackButton}
            onPress={() => goBack()}
          >
            <Text style={styles.goBackButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => goBack()}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.actionButton} onPress={handleDelete}>
            <Trash2 size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.photo }} style={styles.productImage} />
          <View style={styles.imageOverlay}>
            <View style={styles.priceTag}>
              <DollarSign size={16} color={colors.text} />
              <Text style={styles.priceTagText}>
                ${product.price.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.titleSection}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Calendar size={20} color={colors.primary} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Created</Text>
                <Text style={styles.infoValue}>
                  {formatDate(product.createdAt)}
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <DollarSign size={20} color={colors.primary} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Price</Text>
                <Text style={styles.infoValue}>
                  ${product.price.toFixed(2)}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.statsCard}>
            <Text style={styles.statsTitle}>Product Statistics</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>#{product.id.slice(0, 6)}</Text>
                <Text style={styles.statLabel}>Product ID</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>
                  {Math.floor(
                    (Date.now() - product.createdAt.getTime()) /
                      (1000 * 60 * 60 * 24),
                  )}
                </Text>
                <Text style={styles.statLabel}>Days Old</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Trash2 size={20} color={colors.text} />
          <Text style={styles.deleteButtonText}>Delete Product</Text>
        </TouchableOpacity>
      </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: s(20),
    paddingVertical: s(16),
    borderBottomWidth: s(1),
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: s(8),
    marginLeft: s(-8),
  },
  headerTitle: {
    fontSize: rfs(18),
    fontWeight: '600',
    color: colors.text,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: s(16),
  },
  headerActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: s(8),
    marginRight: s(-8),
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    height: width * 0.8,
    backgroundColor: colors.card,
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: s(20),
  },
  priceTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: s(12),
    paddingVertical: s(8),
    borderRadius: s(20),
  },
  priceTagText: {
    color: colors.text,
    fontSize: rfs(16),
    fontWeight: '700',
    marginLeft: s(4),
  },
  detailsContainer: {
    padding: s(20),
  },
  titleSection: {
    marginBottom: s(24),
  },
  productName: {
    fontSize: rfs(28),
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: s(8),
    lineHeight: s(36),
  },
  productPrice: {
    fontSize: rfs(24),
    fontWeight: '600',
    color: colors.primary,
  },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: s(16),
    padding: s(20),
    marginBottom: s(20),
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: s(4),
  },
  infoIcon: {
    width: s(40),
    height: s(40),
    borderRadius: s(20),
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: s(16),
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: rfs(14),
    color: '#9CA3AF',
    marginBottom: s(2),
  },
  infoValue: {
    fontSize: rfs(16),
    fontWeight: '600',
    color: colors.text,
  },
  divider: {
    height: s(1),
    backgroundColor: colors.border,
    marginVertical: s(16),
  },
  statsCard: {
    backgroundColor: colors.card,
    borderRadius: s(16),
    padding: s(20),
  },
  statsTitle: {
    fontSize: rfs(18),
    fontWeight: '600',
    color: colors.text,
    marginBottom: s(16),
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: rfs(20),
    fontWeight: '700',
    color: colors.primary,
    marginBottom: s(4),
  },
  statLabel: {
    fontSize: rfs(14),
    color: '#9CA3AF',
  },
  bottomActions: {
    padding: s(20),
    borderTopWidth: s(1),
    borderTopColor: colors.border,
  },
  deleteButton: {
    backgroundColor: '#EF4444',
    borderRadius: s(12),
    padding: s(16),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: colors.text,
    fontSize: rfs(16),
    fontWeight: '600',
    marginLeft: s(8),
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: s(40),
    backgroundColor: colors.background,
  },
  notFoundText: {
    fontSize: rfs(18),
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: s(24),
  },
  goBackButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: s(24),
    paddingVertical: s(12),
    borderRadius: s(8),
  },
  goBackButtonText: {
    color: colors.text,
    fontSize: rfs(16),
    fontWeight: '600',
  },
});
