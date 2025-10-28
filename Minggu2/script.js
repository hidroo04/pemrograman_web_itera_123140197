// ===== CLASS UNTUK MENGELOLA DATA CUACA =====
class WeatherData {
    constructor(id, city, temperature, condition, humidity, description) {
        this.id = id;
        this.city = city;
        this.temperature = temperature;
        this.condition = condition;
        this.humidity = humidity;
        this.description = description;
        this.timestamp = new Date().toLocaleString('id-ID');
    }

    // Method untuk mendapatkan icon cuaca
    getWeatherIcon() {
        const icons = {
            'Cerah': '☀️',
            'Berawan': '⛅',
            'Hujan': '🌧️',
            'Badai': '⛈️',
            'Mendung': '☁️',
            'Kabut': '🌫️'
        };
        return icons[this.condition] || '🌤️';
    }
}

// ===== CLASS UNTUK MENGELOLA APLIKASI =====
class WeatherApp {
    constructor() {
        this.weatherData = [];
        this.editingId = null;
        this.init();
    }

    // Inisialisasi aplikasi
    init() {
        this.loadFromLocalStorage();
        this.setupEventListeners();
        this.renderWeatherCards();
        this.initAOS();
        this.initScrollButton();
    }

    // Inisialisasi AOS
    initAOS() {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100,
            disable: false
        });
    }

    // Inisialisasi Scroll to Top Button
    initScrollButton() {
        const scrollBtn = document.getElementById('scroll-top');
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollBtn.classList.add('show');
            } else {
                scrollBtn.classList.remove('show');
            }
        });

        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Setup event listeners
    setupEventListeners() {
        const form = document.getElementById('weather-form');
        const searchInput = document.getElementById('search');
        const searchClear = document.getElementById('search-clear');
        const cancelBtn = document.getElementById('cancel-btn');

        form.addEventListener('submit', (e) => this.handleSubmit(e));
        searchInput.addEventListener('input', (e) => this.handleSearch(e));
        searchClear.addEventListener('click', () => this.clearSearch());
        cancelBtn.addEventListener('click', () => this.cancelEdit());

        // Tambahkan efek focus pada input
        this.addInputEffects();
    }

    // Tambahkan efek interaktif pada input
    addInputEffects() {
        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.querySelector('label')?.classList.add('active');
            });
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.querySelector('label')?.classList.remove('active');
                }
            });
        });
    }

    // Handle form submit
    handleSubmit(e) {
        e.preventDefault();

        const submitBtn = document.getElementById('submit-btn');
        const originalText = submitBtn.querySelector('.btn-text').textContent;
        
        // Loading state
        submitBtn.disabled = true;
        submitBtn.querySelector('.btn-text').textContent = 'Menyimpan...';

        // Simulasi delay untuk UX yang lebih baik
        setTimeout(() => {
            const city = document.getElementById('city').value.trim();
            const temperature = parseFloat(document.getElementById('temperature').value);
            const condition = document.getElementById('condition').value;
            const humidity = parseFloat(document.getElementById('humidity').value);
            const description = document.getElementById('description').value.trim();

            if (this.editingId) {
                this.updateWeather(this.editingId, city, temperature, condition, humidity, description);
            } else {
                this.addWeather(city, temperature, condition, humidity, description);
            }

            this.resetForm();
            submitBtn.disabled = false;
            submitBtn.querySelector('.btn-text').textContent = originalText;
        }, 500);
    }

    // Tambah data cuaca baru (Arrow Function)
    addWeather = (city, temperature, condition, humidity, description) => {
        const id = Date.now().toString();
        const newWeather = new WeatherData(id, city, temperature, condition, humidity, description);
        this.weatherData.push(newWeather);
        this.saveToLocalStorage();
        this.renderWeatherCards();
        this.showNotification('Data cuaca berhasil ditambahkan! ✅', 'success');
    }

    // Update data cuaca (Arrow Function)
    updateWeather = (id, city, temperature, condition, humidity, description) => {
        const index = this.weatherData.findIndex(item => item.id === id);
        if (index !== -1) {
            this.weatherData[index] = new WeatherData(id, city, temperature, condition, humidity, description);
            this.saveToLocalStorage();
            this.renderWeatherCards();
            this.showNotification('Data cuaca berhasil diupdate! ✅', 'success');
        }
    }

    // Hapus data cuaca (Arrow Function)
    deleteWeather = (id) => {
        // Custom confirm dialog dengan animasi
        this.showConfirmDialog('Apakah Anda yakin ingin menghapus data cuaca ini?', () => {
            this.weatherData = this.weatherData.filter(item => item.id !== id);
            this.saveToLocalStorage();
            this.renderWeatherCards();
            this.showNotification('Data cuaca berhasil dihapus! 🗑️', 'error');
        });
    }

    // Custom confirm dialog
    showConfirmDialog(message, onConfirm) {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            animation: fadeIn 0.3s ease;
        `;

        const dialog = document.createElement('div');
        dialog.style.cssText = `
            background: white;
            padding: 30px;
            border-radius: 20px;
            max-width: 400px;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            animation: slideUp 0.3s ease;
        `;

        dialog.innerHTML = `
            <div style="font-size: 3rem; margin-bottom: 15px;">⚠️</div>
            <p style="font-size: 1.1rem; color: #374151; margin-bottom: 25px;">${message}</p>
            <div style="display: flex; gap: 10px; justify-content: center;">
                <button id="confirm-yes" style="padding: 10px 25px; background: #ef4444; color: white; border: none; border-radius: 10px; cursor: pointer; font-weight: 600;">Ya, Hapus</button>
                <button id="confirm-no" style="padding: 10px 25px; background: #6b7280; color: white; border: none; border-radius: 10px; cursor: pointer; font-weight: 600;">Batal</button>
            </div>
        `;

        overlay.appendChild(dialog);
        document.body.appendChild(overlay);

        document.getElementById('confirm-yes').addEventListener('click', () => {
            onConfirm();
            overlay.remove();
        });

        document.getElementById('confirm-no').addEventListener('click', () => {
            overlay.remove();
        });

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.remove();
        });
    }

    // Edit data cuaca
    editWeather(id) {
        const weather = this.weatherData.find(item => item.id === id);
        if (weather) {
            document.getElementById('city').value = weather.city;
            document.getElementById('temperature').value = weather.temperature;
            document.getElementById('condition').value = weather.condition;
            document.getElementById('humidity').value = weather.humidity;
            document.getElementById('description').value = weather.description;

            this.editingId = id;
            document.getElementById('form-title').textContent = '✏️ Edit Data Cuaca';
            document.getElementById('submit-btn').querySelector('.btn-text').textContent = 'Update Data Cuaca';
            document.getElementById('cancel-btn').style.display = 'inline-block';

            // Scroll ke form dengan smooth animation
            document.getElementById('weather-form').scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
            });

            // Highlight form
            const formCard = document.querySelector('.form-card');
            formCard.style.animation = 'pulse 0.5s ease';
            setTimeout(() => {
                formCard.style.animation = '';
            }, 500);
        }
    }

    // Batal edit
    cancelEdit() {
        this.resetForm();
        this.showNotification('Edit dibatalkan', 'info');
    }

    // Reset form
    resetForm() {
        document.getElementById('weather-form').reset();
        this.editingId = null;
        document.getElementById('form-title').textContent = '➕ Tambah Data Cuaca Baru';
        document.getElementById('submit-btn').querySelector('.btn-text').textContent = 'Tambah Data Cuaca';
        document.getElementById('cancel-btn').style.display = 'none';
    }

    // Handle pencarian
    handleSearch(e) {
        const searchTerm = e.target.value.toLowerCase();
        const searchClear = document.getElementById('search-clear');
        
        // Show/hide clear button
        if (searchTerm) {
            searchClear.style.display = 'block';
        } else {
            searchClear.style.display = 'none';
        }
        
        this.renderWeatherCards(searchTerm);
    }

    // Clear search
    clearSearch() {
        const searchInput = document.getElementById('search');
        searchInput.value = '';
        document.getElementById('search-clear').style.display = 'none';
        this.renderWeatherCards();
    }

    // Render weather cards dengan template literals
    renderWeatherCards(searchTerm = '') {
        const container = document.getElementById('weather-container');
        const emptyState = document.getElementById('empty-state');

        // Filter data berdasarkan pencarian
        const filteredData = this.weatherData.filter(weather => 
            weather.city.toLowerCase().includes(searchTerm)
        );

        if (filteredData.length === 0) {
            container.innerHTML = '';
            emptyState.classList.add('show');
            return;
        }

        emptyState.classList.remove('show');

        container.innerHTML = filteredData.map((weather, index) => `
            <div class="weather-card" 
                 data-id="${weather.id}"
                 data-aos="fade-up"
                 data-aos-delay="${index * 50}"
                 data-aos-duration="600">
                <div class="weather-header">
                    <div class="city-name">${weather.city}</div>
                    <div class="weather-icon">${weather.getWeatherIcon()}</div>
                </div>
                <div class="weather-body">
                    <div class="temperature">${weather.temperature}°C</div>
                    <div class="condition">${weather.condition}</div>
                    <div class="weather-details">
                        <div class="detail-item">
                            <div class="detail-label">Kelembaban</div>
                            <div class="detail-value">${weather.humidity}%</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Kondisi</div>
                            <div class="detail-value">${weather.condition}</div>
                        </div>
                    </div>
                    ${weather.description ? `<div class="description">"${weather.description}"</div>` : ''}
                    <div class="timestamp">📅 ${weather.timestamp}</div>
                </div>
                <div class="card-actions">
                    <button class="btn btn-edit" onclick="app.editWeather('${weather.id}')">
                        <span class="btn-text">✏️ Edit</span>
                    </button>
                    <button class="btn btn-delete" onclick="app.deleteWeather('${weather.id}')">
                        <span class="btn-text">🗑️ Hapus</span>
                    </button>
                </div>
            </div>
        `).join('');

        // Refresh AOS untuk elemen baru
        AOS.refresh();
    }

    saveToLocalStorage() {
        localStorage.setItem('weatherAppData', JSON.stringify(this.weatherData));
    }

    async loadFromLocalStorage() {
        try {
            await this.simulateAsyncLoad();
            
            const data = localStorage.getItem('weatherAppData');
            if (data) {
                const parsedData = JSON.parse(data);
                // Rekonstruksi objects dengan class WeatherData
                this.weatherData = parsedData.map(item => 
                    new WeatherData(
                        item.id,
                        item.city,
                        item.temperature,
                        item.condition,
                        item.humidity,
                        item.description
                    )
                );
            }
        } catch (error) {
            console.error('Error loading data:', error);
            this.showNotification('Gagal memuat data dari localStorage ❌', 'error');
        }
    }

    async simulateAsyncLoad() {
        return new Promise(resolve => {
            setTimeout(resolve, 100);
        });
    }

    async fetchWeatherFromAPI(city) {
        try {

            const response = await fetch(`https://api.example.com/weather?city=${city}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching weather:', error);
            throw error;
        }
    }

    showNotification(message, type = 'info') {
        const colors = {
            success: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            error: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            info: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
        };

        const icons = {
            success: '✅',
            error: '❌',
            info: 'ℹ️'
        };

        // Buat elemen notifikasi
        const notification = document.createElement('div');
        notification.innerHTML = `
            <span style="font-size: 1.2rem; margin-right: 10px;">${icons[type]}</span>
            <span>${message}</span>
        `;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type]};
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 1000;
            animation: slideInRight 0.3s ease;
            font-weight: 600;
            display: flex;
            align-items: center;
            max-width: 350px;
        `;

        document.body.appendChild(notification);

        // Hapus setelah 3 detik
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}


const app = new WeatherApp();

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    @keyframes slideUp {
        from {
            transform: translateY(50px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    @keyframes pulse {
        0%, 100% {
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        50% {
            box-shadow: 0 25px 70px rgba(102,126,234,0.5);
        }
    }
    
    label.active {
        color: #667eea;
        transform: translateY(-2px);
    }
`;
document.head.appendChild(style);