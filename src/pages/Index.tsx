import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  brand: string;
  rating: number;
  image: string;
  features: string[];
  inStock: boolean;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: 129990,
    originalPrice: 139990,
    category: "smartphone",
    brand: "Apple",
    rating: 4.9,
    image: "/img/19dcc345-0a6c-4db8-8d29-efb3055792ff.jpg",
    features: ["256GB", "Titanium", "A17 Pro", "48MP Camera"],
    inStock: true
  },
  {
    id: 2,
    name: "MacBook Pro 16",
    price: 299990,
    category: "laptop",
    brand: "Apple",
    rating: 4.8,
    image: "/img/8fda03f3-37ce-4287-8a33-da7c3dd2ff5b.jpg",
    features: ["M3 Max", "32GB RAM", "1TB SSD", "16-inch"],
    inStock: true
  },
  {
    id: 3,
    name: "AirPods Pro 2",
    price: 29990,
    originalPrice: 34990,
    category: "headphones",
    brand: "Apple",
    rating: 4.7,
    image: "/img/c6ffc85a-ec0a-4849-a0f0-cfe9a9a1da5a.jpg",
    features: ["Active Noise Cancellation", "USB-C", "Adaptive Audio"],
    inStock: true
  },
  {
    id: 4,
    name: "Samsung Galaxy S24 Ultra",
    price: 119990,
    category: "smartphone",
    brand: "Samsung",
    rating: 4.6,
    image: "/img/19dcc345-0a6c-4db8-8d29-efb3055792ff.jpg",
    features: ["512GB", "S Pen", "200MP Camera", "5000mAh"],
    inStock: false
  },
  {
    id: 5,
    name: "Dell XPS 13",
    price: 189990,
    category: "laptop",
    brand: "Dell",
    rating: 4.5,
    image: "/img/8fda03f3-37ce-4287-8a33-da7c3dd2ff5b.jpg",
    features: ["Intel i7", "16GB RAM", "512GB SSD", "13.4-inch"],
    inStock: true
  },
  {
    id: 6,
    name: "Sony WH-1000XM5",
    price: 34990,
    category: "headphones",
    brand: "Sony",
    rating: 4.8,
    image: "/img/c6ffc85a-ec0a-4849-a0f0-cfe9a9a1da5a.jpg",
    features: ["30h Battery", "Hi-Res Audio", "Quick Charge"],
    inStock: true
  }
];

function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [currentPage, setCurrentPage] = useState('home');

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand;
    
    return matchesSearch && matchesCategory && matchesBrand;
  });

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];
  const brands = ['all', ...Array.from(new Set(products.map(p => p.brand)))];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(price);
  };

  const Navigation = () => (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-inter font-bold bg-tech-gradient bg-clip-text text-transparent">
              TechStore
            </h1>
            <div className="hidden md:flex space-x-6">
              <button
                onClick={() => setCurrentPage('home')}
                className={`font-medium transition-colors ${currentPage === 'home' ? 'text-electric-blue' : 'text-tech-gray hover:text-electric-blue'}`}
              >
                Главная
              </button>
              <button
                onClick={() => setCurrentPage('catalog')}
                className={`font-medium transition-colors ${currentPage === 'catalog' ? 'text-electric-blue' : 'text-tech-gray hover:text-electric-blue'}`}
              >
                Каталог
              </button>
              <button className="font-medium text-tech-gray hover:text-electric-blue transition-colors">
                Контакты
              </button>
              <button className="font-medium text-tech-gray hover:text-electric-blue transition-colors">
                Доставка
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-tech-gray w-4 h-4" />
              <Input
                type="text"
                placeholder="Поиск товаров..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Icon name="ShoppingCart" className="w-5 h-5" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs bg-vibrant-orange">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Корзина покупок</SheetTitle>
                  <SheetDescription>
                    {cartCount === 0 ? 'Ваша корзина пуста' : `${cartCount} товаров`}
                  </SheetDescription>
                </SheetHeader>
                
                <div className="mt-6 space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-tech-gray">{formatPrice(item.price)}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            -
                          </Button>
                          <span className="px-2">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Icon name="Trash2" className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  
                  {cart.length > 0 && (
                    <div className="pt-4 border-t">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold">Итого:</span>
                        <span className="text-xl font-bold text-electric-blue">
                          {formatPrice(cartTotal)}
                        </span>
                      </div>
                      <Button className="w-full bg-vibrant-orange hover:bg-vibrant-orange/90">
                        Оформить заказ
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );

  const HeroSection = () => (
    <section className="relative bg-gradient-to-br from-tech-light via-white to-electric-blue/5 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-inter font-bold text-tech-dark mb-6 animate-fade-in">
            Современная
            <span className="bg-tech-gradient bg-clip-text text-transparent block">
              Техника
            </span>
          </h1>
          <p className="text-xl text-tech-gray mb-8 max-w-2xl mx-auto animate-fade-in">
            Откройте мир передовых технологий. Смартфоны, ноутбуки, наушники от ведущих брендов
            с доставкой по всей России.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
            <Button 
              size="lg" 
              className="bg-vibrant-orange hover:bg-vibrant-orange/90 text-white px-8 py-3 text-lg"
              onClick={() => setCurrentPage('catalog')}
            >
              Смотреть каталог
              <Icon name="ArrowRight" className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-3 text-lg">
              О компании
            </Button>
          </div>
        </div>
      </div>
    </section>
  );

  const FeaturedProducts = () => (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-inter font-bold text-tech-dark mb-4">
            Популярные товары
          </h2>
          <p className="text-xl text-tech-gray">
            Лучшие предложения этого месяца
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.slice(0, 3).map(product => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 animate-scale-in">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.originalPrice && (
                    <Badge className="absolute top-4 left-4 bg-vibrant-orange">
                      Скидка {Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </Badge>
                  )}
                  {!product.inStock && (
                    <Badge variant="secondary" className="absolute top-4 right-4">
                      Нет в наличии
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">{product.category}</Badge>
                  <div className="flex items-center">
                    <Icon name="Star" className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm text-tech-gray">{product.rating}</span>
                  </div>
                </div>
                <CardTitle className="text-xl mb-2">{product.name}</CardTitle>
                <CardDescription className="mb-4">
                  {product.features.join(' • ')}
                </CardDescription>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-2xl font-bold text-electric-blue">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-tech-gray line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button 
                  className="w-full bg-electric-blue hover:bg-electric-blue/90"
                  onClick={() => addToCart(product)}
                  disabled={!product.inStock}
                >
                  <Icon name="ShoppingCart" className="mr-2 w-4 h-4" />
                  {product.inStock ? 'В корзину' : 'Нет в наличии'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );

  const CatalogPage = () => (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-inter font-bold text-tech-dark mb-4">Каталог товаров</h1>
          <p className="text-xl text-tech-gray">Найдите идеальную технику для ваших потребностей</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Фильтры</h3>
              
              <div className="space-y-4">
                <div className="md:hidden">
                  <label className="block text-sm font-medium mb-2">Поиск</label>
                  <div className="relative">
                    <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-tech-gray w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Поиск товаров..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Категория</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category === 'all' ? 'Все категории' : 
                           category === 'smartphone' ? 'Смартфоны' :
                           category === 'laptop' ? 'Ноутбуки' :
                           category === 'headphones' ? 'Наушники' : category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Бренд</label>
                  <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map(brand => (
                        <SelectItem key={brand} value={brand}>
                          {brand === 'all' ? 'Все бренды' : brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <p className="text-tech-gray">
                Найдено {filteredProducts.length} товаров
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <Card key={product.id} className="group hover:shadow-xl transition-all duration-300">
                  <CardHeader className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.originalPrice && (
                        <Badge className="absolute top-4 left-4 bg-vibrant-orange">
                          -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                        </Badge>
                      )}
                      {!product.inStock && (
                        <Badge variant="secondary" className="absolute top-4 right-4">
                          Нет в наличии
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {product.category === 'smartphone' ? 'Смартфон' :
                         product.category === 'laptop' ? 'Ноутбук' :
                         product.category === 'headphones' ? 'Наушники' : product.category}
                      </Badge>
                      <div className="flex items-center">
                        <Icon name="Star" className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 text-sm text-tech-gray">{product.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg mb-2 line-clamp-2">{product.name}</CardTitle>
                    <CardDescription className="mb-3 text-sm">
                      {product.features.slice(0, 2).join(' • ')}
                    </CardDescription>
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-xl font-bold text-electric-blue">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-tech-gray line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button 
                      className="w-full bg-electric-blue hover:bg-electric-blue/90"
                      onClick={() => addToCart(product)}
                      disabled={!product.inStock}
                      size="sm"
                    >
                      <Icon name="ShoppingCart" className="mr-2 w-4 h-4" />
                      {product.inStock ? 'В корзину' : 'Нет в наличии'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <Icon name="SearchX" className="w-16 h-16 text-tech-gray mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-tech-dark mb-2">Товары не найдены</h3>
                <p className="text-tech-gray">Попробуйте изменить параметры поиска</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-tech-light">
      <Navigation />
      
      {currentPage === 'home' ? (
        <>
          <HeroSection />
          <FeaturedProducts />
        </>
      ) : (
        <CatalogPage />
      )}
    </div>
  );
}

export default Index;