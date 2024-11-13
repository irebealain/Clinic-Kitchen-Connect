import {useState, useEffect} from 'react'
import axiosInstance from '../axiosInstance';
const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axiosInstance.get('/api/prescriptions/');
        setPrescriptions(response.data);
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
      }
    };

    fetchPrescriptions();
  }, []);
  return (
    <div>
      <div className="prescription-list">
            <h1 className="text-2xl font-bold">Prescriptions</h1>
            <ul className="mt-4">
                {prescriptions.map((prescripts) => (
                    <li key={prescriptions.id} className="py-2 border-b">
                        <p><strong>Student:</strong> {prescripts.student_id}</p>
                        <p><strong>Special food:</strong> {prescripts.special_food_id}</p>
                        <p><strong>Date issued:</strong> {prescripts.issued_date}</p>
                        <p><strong>Expiry date:</strong> {prescripts.issued_date}</p>
                    </li>
                ))}
            </ul>
        </div>
    </div>
  )
}

export default Prescriptions
