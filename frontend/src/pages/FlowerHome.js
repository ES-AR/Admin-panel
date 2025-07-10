import axios from 'axios';
import { useEffect, useState } from 'react';
import "./FlowerHome.css";
import Redminus from '../assets/Redminus.webp';



const FlowerHome = () => {
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    const getFlowers = async () => {
      try {
        const response = await axios.get('https://flower-website-backend-two-2ddp.onrender.com/api/flowers');
        console.log(response.data);
        setFlowers(response.data);
      } catch (error) {
        console.log('Error fetching flowers:', error);
      }
    };

    getFlowers();
  }, []);
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this flower?");
    if (!confirm) return;

    try {
      await axios.delete(`https://flower-website-backend-two.onrender.com/api/flowers/${id}`);
      setFlowers(prev => prev.filter(flower => flower._id !== id));
    } catch (error) {
      console.error('Delete error:', error.response?.data || error.message);
  alert('Failed to delete flower');
    }
  };

const filteredFlowers = flowers;


  return (
    <div>
      {filteredFlowers.map((flower, index) => (
        <div key={index} className='fir' >
          <div className='image-con'>
            <img className='image'
              src={`https://flower-website-backend-two.onrender.com${flower.Image}`}

              alt={flower.Title}
              style={{ width: '150px', height: '150px', objectFit: 'cover', marginRight: '15px' }}
            />
          </div>
          <div className='texts'>
            <p className='nameclass'> <span className='Naming'>Name:</span> {flower.Title}</p>
            <p className='categoryclass'> <span className='Naming'>Category:</span> {flower.Category}</p>
            <p className='priceclass'> <span className='Naming'>Price:</span> ${flower.Price}</p>
            <p className='descriptionclass'> <span className='Naming'>Description:</span> {flower.Description}</p>
            <img src={Redminus} 
            alt="Delete" 
            className='deleteButton'
            onClick = { () => handleDelete(flower._id)}/>
             {/* <button className="deleteButton" onClick={() => handleDelete(flower._id)}>Delete</button> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlowerHome;
