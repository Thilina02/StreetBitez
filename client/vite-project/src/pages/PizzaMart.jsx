import React, { useState , useEffect} from 'react';
import { Container, Row, Col, Card, Form, InputGroup, Button,Modal } from 'react-bootstrap';
import ReactStars from 'react-rating-stars-component';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PizzaMart.css';
import NavBar from '../components/cartNavbar';

const PizzaMart = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { shopId } = useParams();
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [itemQuantities, setItemQuantities] = useState(1);

  const handleShowModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


  const handleQuantityChange = (item, action) => {
    const updatedQuantities = { ...itemQuantities };

    const index = stall.foodItems.findIndex(i => i.name === item.name);

    if (action === 'increase') {
      updatedQuantities[index] = (updatedQuantities[index] || 0) + 1;
    } else if (action === 'decrease' && updatedQuantities[index] > 1) {
      updatedQuantities[index] -= 1;
    }

    setItemQuantities(updatedQuantities);
    localStorage.setItem('itemQuantities', JSON.stringify(updatedQuantities));

    
  };

  const loadItemQuantities = () => {
    const storedQuantities = JSON.parse(localStorage.getItem('itemQuantities'));
    return storedQuantities || {};
  };

  useEffect(() => {
    setItemQuantities(loadItemQuantities());
  }, []);
  
  const calculateTotalPrice = (item, quantity) => {
    return  item.price * quantity;
  };

  

  const addToCart = (item) => {
    const { name, price, image } = item;
    const quantity = itemQuantities[filteredFoodItems.indexOf(item)] || 1;
  
    axios.post('http://localhost:8000/order/add-to-cart', { name, quantity, price, image })
    .then((response) => {
      alert(response.data.message);
    })
    .catch((error) => {
      console.error(error);
      alert('Error adding item to cart');
    });
  
  };

  // Sample stall data (replace with your actual data)
  const stall = {
    name: 'PIZZA MART',
    description: 'Delicious pizza and more!',
    logo: '../stallImages/pizza mart.png',
    rating: 4.5,
    foodItems: [
      { name: 'Vegitable and Cheese Pizza', category: 'Veg Pizza', rating: 4, price: 890, image:'../stallImages/pexels-vincent-rivaud-2147491.jpg' },
      { name: 'Olive mized veg Pizza', category: 'Veg Pizza', rating: 4, price: 890, image:'../stallImages/pexels-photo-5175567.jpeg' },
      { name: 'Ultimate veg Pizza', category: 'Veg Pizza', rating: 4.5, price: 850, image:'../stallImages/pexels-kristina-paukshtite-1146760.jpg' },
      { name: 'Vegitable and Cheese Pizza', category: 'Veg Pizza', rating: 4, price: 890, image:'../stallImages/pexels-photo-5175567.jpeg' },
      { name: 'Vegitable and Cheese Pizza', category: 'Veg Pizza', rating: 4, price: 850, image:'../../images/pexels-kristina-paukshtite-1146760.jpg' },
      { name: 'Grilled chicken with peparoni', category: 'Non-veg Pizza', rating: 4.5, price: 1000, image:'../../images/pexels-kristina-paukshtite-1146760.jpg' },
      { name: 'Devilled chicken', category: 'Non-veg Pizza', rating: 4.5, price: 1000, image:'../../images/pexels-kristina-paukshtite-1146760.jpg' },
      { name: 'Beef pizza', category: 'Non-veg Pizza', rating: 4.5, price: 1300, image:'../../images/pexels-kristina-paukshtite-1146760.jpg' },
      { name: 'Chocolate Lava Cake', category: 'Desserts', rating: 5, price: 520, image:'../stallImages/pexels-photo-10480244.jpeg' },
      { name: 'Sprite', category: 'Beverages', rating: 4, price: 300, image:''},
      
      // Add more food items with different categories
    ],
  };

  // Get unique categories from foodItems
  const categories = [...new Set(stall.foodItems.map((item) => item.category))];

  const filteredFoodItems = stall.foodItems.filter((item) => {
    return (
      (selectedCategory === 'All' || item.category === selectedCategory) &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <Container>
      <Row className="mt-4">
        <Col xs={12} md={3}>
          <Card>
            <Card.Img variant="top" src={stall.logo} alt={`${stall.name} Logo`} />
            <Card.Body>
              <Card.Title>{stall.name}</Card.Title>
              <Card.Text>
                {stall.description}
                <ReactStars
                  count={5}
                  value={stall.rating}
                  size={24}
                  edit={false}
                  isHalf={true}
                />
              </Card.Text>
            </Card.Body>
          </Card>
          <div className="mt-3">
            <h5>Categories</h5>
            <ul>
              <li
                className={selectedCategory === 'All' ? 'active-category' : ''}
                onClick={() => setSelectedCategory('All')}
              >
                All
              </li>
              {categories.map((category, index) => (
                <li
                  key={index}
                  className={selectedCategory === category ? 'active-category' : ''}
                  onClick={() => setSelectedCategory(category)}
                >
                    
                  {category}
                </li>
              ))}
            </ul>
          </div>
        </Col>
        <Col xs={12} md={9}>
          <Row>
            <Col xs={12} lg={12}>
              <Form.Group>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Search Food Items"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <br/>
          <br/>
          
          <Row>
            {filteredFoodItems.map((item, index) => (
              <Col xs={12} md={6} lg={4} key={index}>
                <Card className="mb-3">
                  <Card.Img variant="top" src={item.image} alt={item.name} />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                      <div>
                        <ReactStars
                          count={5}
                          value={item.rating}
                          size={16}
                          edit={false}
                          isHalf={true}
                        />
                      </div>
                    </Card.Text>

                    <div>
                    <p> Price: ${calculateTotalPrice(item, itemQuantities[index] || 0)}</p>

                      
                    <div className='quantity-control'>
                        <buttonP
                       variant="outline-success"
                       onClick={() => handleQuantityChange(item, "increase")}
                        >
                            +
                        </buttonP>

                        <span className="quantity">{itemQuantities[index] || 1}</span>
                          <buttonP
                           variant="outline-danger"
                           onClick={() => handleQuantityChange(item, "decrease")}
                          >
                            -

                          </buttonP>

                    </div>

                    </div>

                  

                      <buttonP className='addToCart' variant="success" 
                      onClick={() => addToCart(item)}
                      >
                        Add to Cart
                      </buttonP>
                    
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      
    </Container>
   
  );
};

export default PizzaMart;