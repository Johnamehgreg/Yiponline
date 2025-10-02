import { useProductStore } from '@core/store/product-store';
import { colors } from '@core/styles/colors';
import { rfs, s } from '@core/utils/scale';
import { pick, types } from '@react-native-documents/picker';
import { Camera, Plus } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddProductUi() {
  const { addProduct, canAddProduct, getProductCount, error, clearError } =
    useProductStore();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [photo, setPhoto] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error, [{ text: 'OK', onPress: clearError }]);
    }
  }, [error, clearError]);

  const openImageLibrary = async () => {
    try {
      const [result] = await pick({
        mode: 'open',
        type: [types.images],
        allowMultiSelection: false,
      });
      if (result) {
        setPhoto(result.uri);
      }
    } catch (err) {
      // see error handling
    }
  };

  const validateForm = () => {
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Please enter a product name');
      return false;
    }
    if (!price.trim()) {
      Alert.alert('Validation Error', 'Please enter a price');
      return false;
    }
    if (isNaN(Number(price)) || Number(price) <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid price');
      return false;
    }
    if (!photo) {
      Alert.alert('Validation Error', 'Please add a photo');
      return false;
    }
    if (!canAddProduct()) {
      Alert.alert('Limit Reached', 'You can only add up to 5 products');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      addProduct({
        name: name.trim(),
        price: Number(price),
        photo,
      });

      // Reset form
      setName('');
      setPrice('');
      setPhoto('');

      Alert.alert('Success', 'Product added successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to add product');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = name.trim() && price.trim() && photo && canAddProduct();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Add New Product</Text>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{getProductCount()}/5</Text>
          </View>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Product Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter product name"
              placeholderTextColor={colors.text}
              maxLength={50}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Price ($)</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={setPrice}
              placeholder="0.00"
              placeholderTextColor={colors.text}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Product Photo</Text>
            <TouchableOpacity
              style={styles.photoContainer}
              onPress={() => openImageLibrary()}
            >
              {photo ? (
                <Image source={{ uri: photo }} style={styles.selectedPhoto} />
              ) : (
                <View style={styles.photoPlaceholder}>
                  <Camera size={32} color={colors.primary} />
                  <Text style={styles.photoPlaceholderText}>Add Photo</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              styles.submitButton,
              !isFormValid && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={!isFormValid || isSubmitting}
          >
            <Plus size={20} color={colors.text} />
            <Text style={styles.submitButtonText}>
              {isSubmitting ? 'Adding...' : 'Add Product'}
            </Text>
          </TouchableOpacity>

          {!canAddProduct() && (
            <View style={styles.warningContainer}>
              <Text style={styles.warningText}>
                You've reached the maximum of 5 products
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
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
  form: {
    padding: s(20),
  },
  inputGroup: {
    marginBottom: s(24),
  },
  label: {
    fontSize: rfs(16),
    fontWeight: '600',
    color: colors.text,
    marginBottom: s(8),
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: s(12),
    padding: s(16),
    fontSize: rfs(16),
    color: colors.text,
    borderWidth: s(1),
    borderColor: colors.border,
  },
  photoContainer: {
    backgroundColor: colors.card,
    borderRadius: s(12),
    overflow: 'hidden',
    borderWidth: s(1),
    borderColor: colors.border,
  },
  photoPlaceholder: {
    height: s(200),
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoPlaceholderText: {
    fontSize: rfs(16),
    color: colors.text,
    marginTop: s(8),
    fontWeight: '500',
  },
  selectedPhoto: {
    width: '100%',
    height: s(200),
    resizeMode: 'cover',
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: s(12),
    padding: s(16),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: s(8),
  },
  submitButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  submitButtonText: {
    color: colors.text,
    fontSize: rfs(18),
    fontWeight: '600',
    marginLeft: s(8),
  },
  warningContainer: {
    backgroundColor: '#FEF3C7',
    borderRadius: s(8),
    padding: s(12),
    marginTop: s(16),
    borderLeftWidth: s(4),
    borderLeftColor: '#F59E0B',
  },
  warningText: {
    color: '#92400E',
    fontSize: rfs(14),
    fontWeight: '500',
  },
});
