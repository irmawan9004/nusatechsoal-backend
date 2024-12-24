const fetchUserData = () => new Promise((resolve) => {
    setTimeout(() => resolve({ name: 'John Doe', age: 30 }), 2000);
  });
  
  async function getUserData() {
    try {
      const data = await fetchUserData();
      console.log(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
  
  getUserData();
  