import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../../UserContext';
import Alert from '../Alert/Alert';
import './Booking.css';

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading } = useUser();
  const therapistFromState = location.state?.therapist;
  const therapist = therapistFromState || JSON.parse(sessionStorage.getItem('selectedTherapist'));
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [canRender, setCanRender] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("razorpay");
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [selectedState, setSelectedState] = useState("Andhra Pradesh");
  const [bookingData, setBookingData] = useState({});
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // Country and state data
  const countries = [
    "India", "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
    "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
    "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
    "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica",
    "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador",
    "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France",
    "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau",
    "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "Indonesia", "Iran", "Iraq", "Ireland",
    "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea North", "Korea South",
    "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein",
    "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania",
    "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
    "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway",
    "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
    "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe",
    "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia",
    "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan",
    "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
    "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela",
    "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ];

  const countryStates = {
    "United States": [
      "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
      "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
      "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
      "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
      "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
    ],
    "Canada": [
      "Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Northwest Territories", "Nova Scotia", "Nunavut",
      "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", "Yukon"
    ],
    "United Kingdom": [
      "England", "Scotland", "Wales", "Northern Ireland"
    ],
    "Australia": [
      "Australian Capital Territory", "New South Wales", "Northern Territory", "Queensland", "South Australia", "Tasmania", "Victoria", "Western Australia"
    ],
    
    "Germany": [
      "Baden-Württemberg", "Bavaria", "Berlin", "Brandenburg", "Bremen", "Hamburg", "Hesse", "Lower Saxony", "Mecklenburg-Vorpommern",
      "North Rhine-Westphalia", "Rhineland-Palatinate", "Saarland", "Saxony", "Saxony-Anhalt", "Schleswig-Holstein", "Thuringia"
    ],
    "France": [
      "Auvergne-Rhône-Alpes", "Bourgogne-Franche-Comté", "Brittany", "Centre-Val de Loire", "Corsica", "Grand Est", "Hauts-de-France",
      "Île-de-France", "Normandy", "Nouvelle-Aquitaine", "Occitanie", "Pays de la Loire", "Provence-Alpes-Côte d'Azur"
    ],
    "Italy": [
      "Abruzzo", "Aosta Valley", "Apulia", "Basilicata", "Calabria", "Campania", "Emilia-Romagna", "Friuli-Venezia Giulia", "Lazio",
      "Liguria", "Lombardy", "Marche", "Molise", "Piedmont", "Sardinia", "Sicily", "Trentino-South Tyrol", "Tuscany", "Umbria", "Veneto"
    ],
    "Spain": [
      "Andalusia", "Aragon", "Asturias", "Balearic Islands", "Basque Country", "Canary Islands", "Cantabria", "Castile and León",
      "Castile-La Mancha", "Catalonia", "Ceuta", "Community of Madrid", "Extremadura", "Galicia", "La Rioja", "Melilla", "Murcia", "Navarre", "Valencia"
    ],
    "Mexico": [
      "Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas", "Chihuahua", "Coahuila", "Colima", "Durango",
      "Guanajuato", "Guerrero", "Hidalgo", "Jalisco", "Mexico City", "Michoacán", "Morelos", "Nayarit", "Nuevo León", "Oaxaca",
      "Puebla", "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa", "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas"
    ],
    "Brazil": [
      "Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Distrito Federal", "Espírito Santo", "Goiás", "Maranhão",
      "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Pará", "Paraíba", "Paraná", "Pernambuco", "Piauí", "Rio de Janeiro",
      "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia", "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"
    ],
    "Japan": [
      "Aichi", "Akita", "Aomori", "Chiba", "Ehime", "Fukui", "Fukuoka", "Fukushima", "Gifu", "Gunma",
      "Hiroshima", "Hokkaido", "Hyogo", "Ibaraki", "Ishikawa", "Iwate", "Kagawa", "Kagoshima", "Kanagawa", "Kochi",
      "Kumamoto", "Kyoto", "Mie", "Miyagi", "Miyazaki", "Nagano", "Nagasaki", "Nara", "Niigata", "Oita",
      "Okayama", "Okinawa", "Osaka", "Saga", "Saitama", "Shiga", "Shimane", "Shizuoka", "Tochigi", "Tokushima",
      "Tokyo", "Tottori", "Toyama", "Wakayama", "Yamagata", "Yamaguchi", "Yamanashi"
    ],
    "China": [
      "Anhui", "Beijing", "Chongqing", "Fujian", "Gansu", "Guangdong", "Guangxi", "Guizhou", "Hainan", "Hebei",
      "Heilongjiang", "Henan", "Hubei", "Hunan", "Inner Mongolia", "Jiangsu", "Jiangxi", "Jilin", "Liaoning", "Ningxia",
      "Qinghai", "Shaanxi", "Shandong", "Shanghai", "Shanxi", "Sichuan", "Tianjin", "Tibet", "Xinjiang", "Yunnan", "Zhejiang"
    ],
    "Russia": [
      "Adygea", "Altai", "Altai Krai", "Amur", "Arkhangelsk", "Astrakhan", "Bashkortostan", "Belgorod", "Bryansk", "Buryatia",
      "Chechnya", "Chelyabinsk", "Chukotka", "Chuvashia", "Dagestan", "Ingushetia", "Irkutsk", "Ivanovo", "Jewish Autonomous Oblast",
      "Kabardino-Balkaria", "Kaliningrad", "Kalmykia", "Kaluga", "Kamchatka", "Karachay-Cherkessia", "Karelia", "Kemerovo", "Khabarovsk",
      "Khakassia", "Khanty-Mansi", "Kirov", "Komi", "Kostroma", "Krasnodar", "Krasnoyarsk", "Kurgan", "Kursk", "Leningrad", "Lipetsk",
      "Magadan", "Mari El", "Mordovia", "Moscow", "Moscow Oblast", "Murmansk", "Nenets", "Nizhny Novgorod", "North Ossetia", "Novgorod",
      "Novosibirsk", "Omsk", "Orenburg", "Oryol", "Penza", "Perm", "Primorsky", "Pskov", "Rostov", "Ryazan", "Sakha", "Sakhalin",
      "Samara", "Saratov", "Smolensk", "Stavropol", "Sverdlovsk", "Tambov", "Tatarstan", "Tomsk", "Tula", "Tver", "Tyumen", "Udmurtia",
      "Ulyanovsk", "Vladimir", "Volgograd", "Vologda", "Voronezh", "Yamalo-Nenets", "Yaroslavl", "Zabaykalsky"
    ],
    "India": [
      "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
    ]
  };

  // Get states for selected country
  const getStatesForCountry = (country) => {
    return countryStates[country] || [];
  };

  // Handle country change
  const handleCountryChange = (e) => {
    const newCountry = e.target.value;
    setSelectedCountry(newCountry);
    const states = getStatesForCountry(newCountry);
    setSelectedState(states.length > 0 ? states[0] : "");
  };

  useEffect(() => {
    if (therapistFromState) {
      sessionStorage.setItem('selectedTherapist', JSON.stringify(therapistFromState));
    }
  }, [therapistFromState]);

  useEffect(() => {
    if (loading) return; // Wait for user loading to complete

    if (!user) {
      setTimeout(() => navigate('/login'), 0);
    } else if (!therapist) {
      setTimeout(() => navigate('/therapist'), 0);
    } else {
      setCanRender(true);
    }
  }, [user, therapist, navigate, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!therapist || !therapist.therapist_id) {
      setAlertType('error');
      setMessage('Therapist information is missing. Cannot proceed with booking.');
      return;
    }

    const formData = new FormData(e.target);
    setBookingData({
      session_type: formData.get('session-type'),
      booking_date: formData.get('date'),
      booking_time: formData.get('time'),
      concerns: formData.get('concerns')
    });

    setShowPaymentForm(true);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    // Simulate payment processing
    setAlertType('success');
    setMessage('Processing payment...');

    setTimeout(async () => {
      // Simulate payment success
      setMessage('Payment successful! Processing booking...');

      try {
        // Create booking
        const bookingDataParams = new URLSearchParams();
        bookingDataParams.append('user_id', user.id);
        bookingDataParams.append('therapist_id', therapist.therapist_id);
        bookingDataParams.append('session_type', bookingData.session_type);
        bookingDataParams.append('booking_date', bookingData.booking_date);
        bookingDataParams.append('booking_time', bookingData.booking_time);
        bookingDataParams.append('concerns', bookingData.concerns);
        bookingDataParams.append('payment_method', selectedPaymentMethod);

        const bookingRes = await fetch('http://localhost/Healhub/api/create_booking.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: bookingDataParams.toString()
        });
        const bookingResponse = await bookingRes.json();
        if (!bookingResponse.success) {
          setAlertType('error');
          setMessage('Booking failed: ' + (bookingResponse.message || 'Unknown error'));
          console.error('Booking failed:', bookingResponse.message);
          return;
        }

        const bookingId = bookingResponse.booking_id;

        // Create payment order (insert into payments table)
        const orderRes = await fetch('http://localhost/Healhub/api/create_payment_order.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: 100, // Assume $100 for now, can be dynamic
            user_id: user.id,
            booking_id: bookingId
          })
        });
        const orderData = await orderRes.json();
        if (!orderData.success) {
          setAlertType('error');
          setMessage('Payment order failed: ' + (orderData.message || 'Unknown error'));
          return;
        }

        // Simulate payment completion (update payments table to completed)
        const updateRes = await fetch('http://localhost/Healhub/api/update_booking_payment.php', {
          method: 'POST',
          body: new URLSearchParams({
            booking_id: bookingId,
            payment_id: 'pay_simulated_' + Date.now()
          })
        });
        const updateData = await updateRes.json();
        if (updateData.success) {
          setAlertType('success');
          setMessage('Booking and payment successful!');
          setShowPaymentForm(false);
          setTimeout(() => navigate('/home'), 5000);
        } else {
          setAlertType('error');
          setMessage('Payment update failed: ' + (updateData.message || 'Unknown error'));
        }
      } catch (err) {
        setAlertType('error');
        setMessage('Booking failed: ' + err.message);
      }
    }, 2000); // 2 second delay for fake payment processing
  };

  const handlePaymentCancel = () => {
    setShowPaymentForm(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!therapist) {
    return null;
  }

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const decimalPart = rating - fullStars;
    const hasHalfStar = decimalPart >= 0.25 && decimalPart < 0.75;
    const hasQuarterStar = decimalPart >= 0.1 && decimalPart < 0.25;
    const hasThreeQuarterStar = decimalPart >= 0.75;
    let emptyStars = 5 - fullStars;

    if (hasHalfStar) {
      emptyStars -= 1;
    } else if (hasQuarterStar || hasThreeQuarterStar) {
      emptyStars -= 1;
    }

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star full">★</span>);
    }

    if (hasThreeQuarterStar) {
      stars.push(<span key="three-quarter" className="star three-quarter">★</span>);
    } else if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    } else if (hasQuarterStar) {
      stars.push(<span key="quarter" className="star quarter">★</span>);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">★</span>);
    }
    return stars;
  };

  const ratingValue = parseFloat(therapist.rating.split(' ')[0]);

  if (showPaymentForm) {
    return (
      <div>
        <div className="payment-header">
          <h2>Complete Your Payment</h2>
          <p>Review your details and securely complete your booking payment</p>
        </div>
        <div className="checkout-container">
          <form className="payment-form" onSubmit={handlePaymentSubmit}>
            {/* Personal Info */}
            <h2>1. Personal Information</h2>
            <div className="form-row">
              <input type="text" className="form-input" placeholder="First Name" required />
              <input type="text" className="form-input" placeholder="Last Name" required />
            </div>
            <input type="email" className="form-input" placeholder="Email Address" required />

            {/* Billing Address */}
            <h2>2. Billing Address</h2>
            <input type="text" className="form-input" placeholder="Street" required />
            <div className="form-row">
              <input type="text" className="form-input" placeholder="City" required />
              <select
                className="form-input"
                value={selectedCountry}
                onChange={handleCountryChange}
              >
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
            <div className="form-row">
              <input type="text" className="form-input" placeholder="Zip" required />
              <select
                className="form-input"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                disabled={getStatesForCountry(selectedCountry).length === 0}
              >
                {getStatesForCountry(selectedCountry).length > 0 ? (
                  getStatesForCountry(selectedCountry).map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))
                ) : (
                  <option value="">No states available for this country</option>
                )}
              </select>
            </div>

            {/* Payment Information */}
            <h2>3. Your payment information</h2>
            <div className="payment-methods">
              <label
                className={`payment-option ${selectedPaymentMethod === "cash" ? "selected" : ""}`}
                onClick={() => setSelectedPaymentMethod("cash")}
              >
                <span>Cash</span>
              </label>
              <label
                className={`payment-option ${selectedPaymentMethod === "paypal" ? "selected" : ""}`}
                onClick={() => setSelectedPaymentMethod("paypal")}
              >
                <span>PayPal</span>
              </label>
              <label
                className={`payment-option ${selectedPaymentMethod === "razorpay" ? "selected" : ""}`}
                onClick={() => setSelectedPaymentMethod("razorpay")}
              >
                <span>RazorPay</span>
              </label>
            </div>

            <div className="terms-checkbox">
              <input
                type="checkbox"
                id="agree-terms"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                required
              />
              <label htmlFor="agree-terms">
                By clicking Checkout Now, you agree to the{' '}
                <a href="/terms">Terms of Service</a> and{' '}
                <a href="/privacy">Privacy Policy</a>
              </label>
            </div>

            <div className="form-actions">
              <button type="button" className="cancel-button" onClick={handlePaymentCancel}>
                Cancel
              </button>
              <button type="submit" className="checkout-btn" disabled={!agreeToTerms}>
                Checkout Now
              </button>
            </div>
          </form>

          {/* Order Summary */}
          <div className="order-summary">
            <h4>Therapy Session</h4>
            <div className="summary-row">
              <span>{therapist?.name || 'Therapist'} Session x 1</span>
              <span>{therapist?.price || '$100.00'}</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>{therapist?.price || '$100.00'}</span>
            </div>
          </div>

          <Alert
            type={alertType}
            message={message}
            onClose={() => setMessage("")}
            duration={alertType === 'error' ? 10000 : 3000}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="booking-container">
      <div className="booking-header">
        <h2>Book Your Session</h2>
        <p>Please confirm your therapist and session details</p>
      </div>

      <div className="booking-content">
        <div className="therapist-info">
          <img src={therapist.photo_url} alt={therapist.name} className="therapist-photo" />
          <h3>{therapist.name}</h3>
          <p className="role">{therapist.title}</p>
          <p className="education">{therapist.education}</p>
          <p className="experience">{therapist.experience}</p>
          <div className="therapist-bio">
            <strong>Specializations:</strong> {therapist.specialties}<br />
            <strong>Approach:</strong> {therapist.approach}
          </div>
          <p className="availability">{therapist.availability}</p>
          <div className="therapist-rating">
            {renderStars(ratingValue)} {therapist.rating}
          </div>
          <p className="location">{therapist.location}</p>
          <p className="price">{therapist.price}</p>
        </div>

        {/* Booking Form */}
        <form className="booking-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <label htmlFor="session-type">Session Type</label>
          <select id="session-type" name="session-type" required>
            <option value="">Select session type</option>
            <option value="individual">Individual Therapy</option>
            <option value="couples">Couples Therapy</option>
            <option value="family">Family Therapy</option>
          </select>
        </div>

        <div className="form-section">
          <label htmlFor="date">Preferred Date</label>
          <input type="date" id="date" name="date" required />
        </div>

        <div className="form-section">
          <label htmlFor="time">Preferred Time</label>
          <select id="time" name="time" required>
            <option value="">Select time</option>
            <option value="09:00:00">9:00 AM</option>
            <option value="10:00:00">10:00 AM</option>
            <option value="11:00:00">11:00 AM</option>
            <option value="13:00:00">1:00 PM</option>
            <option value="14:00:00">2:00 PM</option>
            <option value="15:00:00">3:00 PM</option>
            <option value="16:00:00">4:00 PM</option>
          </select>
        </div>

        <div className="form-section">
          <label htmlFor="concerns">Brief Description of Concerns</label>
          <textarea id="concerns" name="concerns" placeholder="Describe your concerns or goals for the session..." rows="4"></textarea>
        </div>
        {/* Removed reviews section as per user request */}

        <button type="submit" className="booking-button">Book Session</button>
        </form>
      </div>

      {/* Alert shown at top center */}
      <Alert
        type={alertType}
        message={message}
        onClose={() => setMessage("")}
        duration={alertType === 'error' ? 10000 : 3000}
      />
    </div>
  );
};

export default Booking;
