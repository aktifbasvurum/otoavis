document.addEventListener('DOMContentLoaded', function () {
    // Sayfa açılır açılmaz sunucuyla senkronize et
    if (typeof DataManager !== 'undefined') {
        DataManager.initAutoSync();
    }

    // TurkeyLocations is loaded from data_locations.js

    // --- Main Search: City/District Logic ---
    const citySelect = document.getElementById('city-select');
    const districtSelect = document.getElementById('district-select');

    if (citySelect && districtSelect && typeof TurkeyLocations !== 'undefined') {
        const provinces = TurkeyLocations.getProvinces();

        // Populate Provinces
        provinces.forEach(p => {
            const option = document.createElement('option');
            option.value = p.name;
            option.textContent = p.name;
            citySelect.appendChild(option);
        });

        // City Change Event
        citySelect.addEventListener('change', function () {
            const selectedCity = this.value;
            districtSelect.innerHTML = '<option value="">Semt Seçin</option>';

            if (selectedCity) {
                const districts = TurkeyLocations.getDistricts(selectedCity);
                if (districts.length > 0) {
                    districtSelect.disabled = false;
                    districts.forEach(d => {
                        const option = document.createElement('option');
                        option.value = d;
                        option.textContent = d;
                        districtSelect.appendChild(option);
                    });
                } else {
                    districtSelect.disabled = true;
                    districtSelect.innerHTML = '<option value="">Semt Bulunamadı</option>';
                }
            } else {
                districtSelect.disabled = true;
                districtSelect.innerHTML = '<option value="">Önce İl Seçin</option>';
            }
        });
    }

    // --- Return City Logic (Different City) ---
    const returnCitySelect = document.getElementById('return-city-select');
    const returnDistrictSelect = document.getElementById('return-district-select');

    if (returnCitySelect && returnDistrictSelect && typeof TurkeyLocations !== 'undefined') {
        const provinces = TurkeyLocations.getProvinces();
        provinces.forEach(p => {
            const option = document.createElement('option');
            option.value = p.name;
            option.textContent = p.name;
            returnCitySelect.appendChild(option);
        });

        returnCitySelect.addEventListener('change', function () {
            const selectedCity = this.value;
            returnDistrictSelect.innerHTML = '<option value="">Semt Seçin</option>';

            if (selectedCity) {
                const districts = TurkeyLocations.getDistricts(selectedCity);
                returnDistrictSelect.disabled = false;
                districts.forEach(d => {
                    const option = document.createElement('option');
                    option.value = d;
                    option.textContent = d;
                    returnDistrictSelect.appendChild(option);
                });
            } else {
                returnDistrictSelect.disabled = true;
            }
        });
    }

    // --- Delivery Page: Airport Logic (for teslimat.php) ---
    const airportCitySelect = document.getElementById('airport-city');
    const airportLocSelect = document.getElementById('airport-location');

    if (airportCitySelect && airportLocSelect && typeof TurkeyLocations !== 'undefined') {
        const provinces = TurkeyLocations.getProvinces();
        // Filter only provinces with airports if we wanted, but let's show all and show 'No Airport' if empty
        // Or just show all.
        provinces.forEach(p => {
            const option = document.createElement('option');
            option.value = p.name;
            option.textContent = p.name;
            airportCitySelect.appendChild(option);
        });

        airportCitySelect.addEventListener('change', function () {
            const selectedCity = this.value;
            airportLocSelect.innerHTML = '<option value="">Havalimanı Seçiniz</option>';

            if (selectedCity) {
                const airports = TurkeyLocations.getAirports(selectedCity);
                if (airports.length > 0) {
                    airportLocSelect.disabled = false;
                    airports.forEach(a => {
                        const option = document.createElement('option');
                        option.value = a;
                        option.textContent = a;
                        airportLocSelect.appendChild(option);
                    });
                } else {
                    airportLocSelect.disabled = true;
                    airportLocSelect.innerHTML = '<option value="">Bu ilde havalimani bulunmuyor</option>';
                }
            } else {
                airportLocSelect.disabled = true;
            }
        });
    }

    // Tab butonları (Güncellenmiş Kapsamlı Mantık)
    const tabContainers = document.querySelectorAll('.search-tabs');
    tabContainers.forEach(container => {
        const buttons = container.querySelectorAll('.tab-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault(); // Varsayılan davranışı engelle
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Valet Text Toggle logic removed as per user request to keep it static

            });
        });
    });

    // Different City Logic
    const diffCityCheck = document.getElementById('diff-city-check');
    const diffCityContainer = document.getElementById('diff-city-container');
    const onewayNotif = document.getElementById('oneway-notification');

    if (diffCityCheck && diffCityContainer) {
        diffCityCheck.addEventListener('change', function () {
            if (this.checked) {
                diffCityContainer.style.display = 'grid';
                if (onewayNotif) {
                    onewayNotif.style.top = '20px';
                    setTimeout(() => {
                        onewayNotif.style.top = '-100px';
                    }, 5000);
                }
            } else {
                diffCityContainer.style.display = 'none';
            }
        });
    }

    // Form submit
    const form = document.getElementById('reservation-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (citySelect.value && districtSelect.value) { // Basic checks
                // Seçili tab'a göre 'type' belirle
                const activeCustTab = document.querySelector('#customer-type-tabs .tab-btn.active');
                const custType = activeCustTab ? activeCustTab.dataset.custType : 'individual';

                const activeRentalTab = document.querySelector('#rental-tabs .tab-btn.active');
                // Check if text content contains AYLIK (it might have spans inside now)
                const rentalType = activeRentalTab && activeRentalTab.innerText.includes('AYLIK') ? 'monthly' : 'daily';

                const activeDeliveryTab = document.querySelector('#delivery-tabs .tab-btn.active');
                const deliveryType = activeDeliveryTab ? activeDeliveryTab.dataset.delivery : 'airport';

                // Dates
                const dateInputs = form.querySelectorAll('.date-input');
                const pDate = dateInputs[0]?.value || '';
                const rDate = dateInputs[1]?.value || '';

                const city = citySelect.value;
                window.location.href = `listing.php?cust_type=${custType}&type=${rentalType}&delivery=${deliveryType}&p_date=${encodeURIComponent(pDate)}&r_date=${encodeURIComponent(rDate)}&city=${encodeURIComponent(city)}`;
            } else {
                alert('Lütfen şehir ve ilçe seçiniz.');
            }
        });
    }

    // --- Date Helper Functions ---
    const parseDate = (dateStr) => {
        if (!dateStr) return new Date();

        // Handle YYYY-MM-DDTHH:mm (datetime-local default)
        if (dateStr.indexOf('T') !== -1) {
            const parts = dateStr.split('T');
            const d = parts[0].split('-');
            const t = parts[1].split(':');
            // y, m-1, d, h, m
            return new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2]), parseInt(t[0]), parseInt(t[1]));
        }

        // Handle DD.MM.YYYY HH:mm or DD.MM.YYYY
        const parts = dateStr.split(' ');
        const dateParts = parts[0].split('.');
        if (dateParts.length === 3) {
            const timeParts = parts[1] ? parts[1].split(':') : ['10', '00'];
            return new Date(parseInt(dateParts[2]), parseInt(dateParts[1]) - 1, parseInt(dateParts[0]), parseInt(timeParts[0]), parseInt(timeParts[1]));
        }

        return new Date(dateStr);
    };

    const formatDate = (dateStr) => {
        const date = parseDate(dateStr);
        if (isNaN(date)) return dateStr;
        return date.toLocaleDateString('tr-TR') + ' ' + date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    };

    const calculateDays = (date1, date2) => {
        const d1 = parseDate(date1);
        const d2 = parseDate(date2);

        if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return 1;

        const diffTime = Math.abs(d2 - d1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 1;
    };

    // Helper: Fiyat Formatla
    const formatPrice = (price) => {
        return new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 0 }).format(price);
    };

    // Listeleme Sayfası Mantığı
    const listingContainer = document.getElementById('listing-container');
    if (listingContainer && typeof DataManager !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const custType = urlParams.get('cust_type') || 'individual';
        const rentalType = urlParams.get('type') || 'daily';
        const p_date = urlParams.get('p_date') || '21.12.2025 10:00';
        const r_date = urlParams.get('r_date') || '24.12.2025 10:00';
        const city = urlParams.get('city') || '';
        const currentDeliveryType = urlParams.get('delivery') || 'valet';

        // Calculate Days
        const rentalDays = calculateDays(p_date, r_date);

        const allCars = DataManager.getCars();
        const filters = document.querySelectorAll('.car-filter');

        const renderCars = (carList) => {
            // Fiyata göre sırala (Ucuzdan Pahalıya)
            carList.sort((a, b) => parseFloat(a.priceOnline) - parseFloat(b.priceOnline));

            listingContainer.innerHTML = ''; // Temizle

            if (carList.length === 0) {
                listingContainer.innerHTML = '<div style="text-align:center; padding:2rem; width:100%;">Seçilen kriterlere uygun araç bulunamadı.</div>';
            } else {
                carList.forEach(car => {
                    let displayPriceOffice, displayPriceOnline;
                    let showDiscount = false;

                    let mileageLimit = '600 KM';
                    const depositPrice = 4000;

                    if (rentalType === 'monthly') {
                        // Monthly Calculation: Daily * Days * 0.70 (30% Discount)
                        mileageLimit = '14.000 KM';

                        const dailyRate = car.priceOnline;
                        // NEW: Calculate based on actual rental days
                        const totalBase = dailyRate * rentalDays;

                        displayPriceOffice = totalBase; // No discount price, No deposit
                        displayPriceOnline = totalBase * 0.70; // 30% Discount (Monthly Rate), No deposit

                        showDiscount = true;
                    } else {
                        // Daily Calculation: Multiply by Days
                        const dailyRate = car.priceOnline;
                        displayPriceOnline = dailyRate * rentalDays; // Rental Only, No deposit
                        showDiscount = false;
                    }

                    // Next Link includes Dates and City
                    const nextLink = `checkout.php?cust_type=${custType}&car_id=${car.id}&type=${rentalType}&delivery=${currentDeliveryType}&p_date=${encodeURIComponent(p_date)}&r_date=${encodeURIComponent(r_date)}&city=${encodeURIComponent(city)}`;

                    // Price HTML Logic
                    let priceHTML = '';
                    if (showDiscount) {
                        priceHTML = `
                            <div style="font-size:0.8rem; color:#6B7280; text-decoration: line-through;">${formatPrice(displayPriceOffice)} TL</div>
                            <div style="font-size:1.5rem; font-weight:700; color:#1F2937;">${formatPrice(displayPriceOnline)} TL</div>
                            <div style="font-size:0.75rem; color:#10B981;">Toplam (${rentalDays} Gün) - %30 İndirimli</div>
                         `;
                    } else {
                        priceHTML = `
                             <div style="font-size:0.9rem; color:#6B7280; margin-bottom: 2px;">Günlük: <strong>${formatPrice(car.priceOnline)} TL</strong></div>
                             <div style="font-size:1.5rem; font-weight:700; color:#1F2937;">${formatPrice(displayPriceOnline)} TL</div>
                             <div style="font-size:0.75rem; color:#6B7280;">Toplam (${rentalDays} Gün)</div>
                         `;
                    }

                    const carHTML = `
                    <div class="car-card">
                        <div class="car-header">
                            <span class="car-type">${car.segment}</span>
                            <h3 class="car-name">${car.name}</h3>
                        </div>
                        <img src="${car.image}" alt="${car.name}" class="car-image">
                        <div class="car-features">
                            <span><i class="fa-solid fa-gas-pump"></i> ${car.fuel}</span>
                            <span><i class="fa-solid fa-gear"></i> ${car.gear}</span>
                            <span><i class="fa-solid fa-user-group"></i> ${car.people} Kişi</span>
                            <span><i class="fa-solid fa-suitcase"></i> ${car.bags} Valiz</span>
                        </div>
                         <!-- New Info Badges -->
                        <div style="display:flex; flex-wrap:wrap; gap:10px; margin-bottom:1rem; font-size:0.8rem;">
                             <span style="background:#f3f4f6; padding:4px 8px; border-radius:4px; color:#374151;">
                                <i class="fa-solid fa-road"></i> Sınır: <strong>${mileageLimit}</strong>
                             </span>
                             <span style="background:#f3f4f6; padding:4px 8px; border-radius:4px; color:#374151;">
                                <i class="fa-solid fa-wallet"></i> Depozito: <strong>${formatPrice(depositPrice)} TL</strong>
                             </span>
                        </div>
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:auto;">
                            <div>
                                ${priceHTML}
                            </div>
                            <a href="${nextLink}" class="btn">HEMEN KİRALA</a>
                        </div>
                    </div>
                    `;
                    listingContainer.insertAdjacentHTML('beforeend', carHTML);
                });
            }
        };

        // Initial Render
        renderCars(allCars);

        // Filter Listeners
        if (filters.length > 0) {
            filters.forEach(f => f.addEventListener('change', () => {
                const selected = Array.from(filters).filter(i => i.checked).map(i => i.value);

                if (selected.length === 0) {
                    renderCars(allCars);
                } else {
                    const filtered = allCars.filter(c => {
                        // Normalize comparison
                        return selected.some(s => c.segment.toUpperCase().includes(s.toUpperCase()));
                    });
                    renderCars(filtered);
                }
            }));
        }
    }

    // Ödeme Sayfası (odeme.php) Mantığı
    const paymentInfoCard = document.getElementById('payment-info-card');
    if (paymentInfoCard && typeof DataManager !== 'undefined') {
        const ibanData = DataManager.getIBAN();
        const urlParams = new URLSearchParams(window.location.search);

        // Müşteri ve Araç Bilgileri (URL'den ve DataManager'dan)
        const d_name = urlParams.get('d_name') || '-';
        const d_surname = urlParams.get('d_surname') || '-';
        const d_phone = urlParams.get('d_phone') || '-';

        // Dates for Payment Page
        const p_date = urlParams.get('p_date') || '21.12.2025';
        const r_date = urlParams.get('r_date') || '24.12.2025';

        const carId = urlParams.get('car_id');
        const cars = DataManager.getCars();
        const car = cars.find(c => c.id == carId) || { name: 'Araç Modeli', segment: 'Bilinmiyor' };

        // Rastgele Plaka Oluşturucu (Gerçekçi görünmesi için)
        const randomPlate = "34 " + String.fromCharCode(65 + Math.floor(Math.random() * 26)) + String.fromCharCode(65 + Math.floor(Math.random() * 26)) + " " + Math.floor(100 + Math.random() * 900);

        const customerInfoHTML = `
            <div style="background: white; border-radius: 12px; padding: 1.5rem; margin-bottom: 2rem; box-shadow: 0 4px 6px rgba(0,0,0,0.02); border: 1px solid #E5E7EB;">
                <h3 style="margin-bottom: 1.5rem; display:flex; align-items:center; gap:10px; font-size: 1.1rem; color: #1F2937;">
                    <i class="fa-solid fa-user"></i> Müşteri Bilgileri
                </h3>
                
                <div style="display: flex; flex-direction: column; gap: 0.8rem;">
                    
                    <div style="border: 1px solid #E5E7EB; border-radius: 8px; padding: 0.8rem;">
                        <span style="display:block; font-size: 0.75rem; color: #6B7280; font-weight: 600; text-transform: uppercase;">AD SOYAD</span>
                        <div style="font-weight: 600; color: #1F2937; margin-top: 2px;">${d_name} ${d_surname}</div>
                    </div>

                    <div style="border: 1px solid #E5E7EB; border-radius: 8px; padding: 0.8rem;">
                        <span style="display:block; font-size: 0.75rem; color: #6B7280; font-weight: 600; text-transform: uppercase;">TELEFON</span>
                        <div style="font-weight: 600; color: #1F2937; margin-top: 2px;">${d_phone}</div>
                    </div>

                    <div style="border: 1px solid #E5E7EB; border-radius: 8px; padding: 0.8rem;">
                        <span style="display:block; font-size: 0.75rem; color: #6B7280; font-weight: 600; text-transform: uppercase;">ARAÇ MODELİ</span>
                        <div style="font-weight: 600; color: #1F2937; margin-top: 2px;">${car.name}</div>
                    </div>

                    <div style="border: 1px solid #E5E7EB; border-radius: 8px; padding: 0.8rem;">
                        <span style="display:block; font-size: 0.75rem; color: #6B7280; font-weight: 600; text-transform: uppercase;">ARAÇ PLAKASI</span>
                        <div style="font-weight: 700; color: #fff; background: #EF4444; display: inline-block; padding: 2px 8px; border-radius: 4px; margin-top: 5px; font-family: monospace;">${randomPlate}</div>
                    </div>
                    
                    <div style="border: 1px solid #E5E7EB; border-radius: 8px; padding: 0.8rem;">
                         <span style="display:block; font-size: 0.75rem; color: #6B7280; font-weight: 600; text-transform: uppercase;">KİRALAMA TARİHLERİ</span>
                         <div style="font-weight: 600; color: #1F2937; margin-top: 2px;">${p_date} - ${r_date}</div>
                    </div>

                </div>
            </div>
        `;

        const paymentHTML = customerInfoHTML + `
            <div style="background: #F9FAFB; padding: 1.5rem; border-radius: 8px; border: 1px solid #E5E7EB;">
                <p style="margin-bottom: 0.5rem; font-size: 0.9rem; color: #6B7280;">Banka Adı</p>
                <div style="font-weight: 700; font-size: 1.1rem; margin-bottom: 1rem; color: #1F2937;">${ibanData.bankName}</div>
                
                <p style="margin-bottom: 0.5rem; font-size: 0.9rem; color: #6B7280;">Alıcı Adı Soyadı</p>
                <div style="font-weight: 700; font-size: 1.1rem; margin-bottom: 1rem; color: #1F2937;">${ibanData.recipient}</div>
                
                <p style="margin-bottom: 0.5rem; font-size: 0.9rem; color: #6B7280;">IBAN Numarası</p>
                <div style="background: #fff; padding: 0.8rem; border: 1px dashed #D1D5DB; border-radius: 6px; font-family: monospace; font-size: 1.2rem; letter-spacing: 2px;">
                    ${ibanData.iban}
                    <button onclick="navigator.clipboard.writeText('${ibanData.iban}').then(()=>alert('IBAN kopyalandı!'))" style="float: right; border:none; background:none; cursor:pointer; color: #FF6600;">
                        <i class="fa-regular fa-copy"></i>
                    </button>
                </div>
            </div>

            <!-- Timer -->
            <div class="timer-container">
                <div class="timer-header">
                    <i class="fa-regular fa-clock"></i> KALAN ÖDEME SÜRESİ
                </div>
                <div class="timer-content">
                    <div class="timer-display">
                        <div class="timer-box">
                            <span id="timer-min" class="timer-digit">29</span>
                            <span class="timer-label">Dakika</span>
                        </div>
                        <span class="timer-separator">:</span>
                        <div class="timer-box">
                            <span id="timer-sec" class="timer-digit">59</span>
                            <span class="timer-label">Saniye</span>
                        </div>
                    </div>
                    <div style="margin-top:0.5rem;">
                        <p class="timer-warning">
                            <i class="fa-solid fa-circle-exclamation"></i> 
                            Süre dolduğunda rezervasyonunuz iptal edilecektir.
                        </p>
                    </div>
                </div>
            </div>
            
            <div style="margin-top: 2rem; padding: 1rem; background: #FFF7ED; border-left: 4px solid #FF6600; font-size: 0.9rem; color: #9A3412;">
                <i class="fa-solid fa-circle-info" style="margin-right: 5px;"></i>
                Lütfen ödeme açıklama kısmına <strong>Ad Soyad</strong> ve <strong>Araç Plakasını</strong> yazmayı unutmayınız.
            </div>

            <!-- Dekont Upload Section -->
            <div style="margin-top: 2rem; padding: 1.5rem; background: #fff; border: 1px solid #E5E7EB; border-radius: 8px;">
                <h4 style="margin-bottom: 1rem; color: #374151; font-size: 1rem;"><i class="fa-solid fa-file-invoice"></i> Dekont Yükleme</h4>
                <p style="margin-bottom: 0.5rem; font-size: 0.85rem; color: #6B7280;">Lütfen ödemenize ait dekontu yükleyiniz. Dekont yüklemeden işlem tamamlanamaz.</p>
                <input type="file" id="receipt-file" accept="image/*,.pdf" style="display: block; width: 100%; padding: 0.5rem; border: 1px solid #D1D5DB; border-radius: 6px;">
                <div id="upload-status" style="margin-top: 10px; font-size: 0.9rem;"></div>
            </div>

            <button id="finish-payment-btn" class="btn btn-primary btn-block btn-lg" style="margin-top: 2rem;">
                ÖDEMEYİ YAPTIM, ONAYLA
            </button>
        `;
        paymentInfoCard.insertAdjacentHTML('beforeend', paymentHTML);

        // Calculate Price & Name for Next Step URL
        // Avoiding redeclaration
        const urlParamsForUrl = new URLSearchParams(window.location.search);
        const carIdForUrl = urlParamsForUrl.get('car_id');
        const rentalTypeForUrl = urlParamsForUrl.get('type') || 'daily';
        const paymentMethodForUrl = urlParamsForUrl.get('payment_method') || 'monthly_installment'; // Default if missing

        let finalPriceForUrl = '0';
        let carNameForUrl = 'Arac';

        if (typeof DataManager !== 'undefined' && carIdForUrl) {
            const cars = DataManager.getCars();
            const car = cars.find(c => c.id == carIdForUrl);
            if (car) {
                carNameForUrl = car.name;

                // Dates for Calculation
                const rentalDays = calculateDays(p_date, r_date);

                let basePrice = car.priceOnline;
                let calculatedPrice = basePrice;

                if (rentalTypeForUrl === 'monthly') {
                    // Monthly Logic: Days * price * 0.70
                    const totalBase = basePrice * rentalDays;
                    calculatedPrice = totalBase * 0.70;

                    // If Upfront, extra 15% discount
                    if (paymentMethodForUrl === 'upfront') {
                        calculatedPrice = calculatedPrice * 0.85;
                    }
                } else {
                    // Daily: duration * price
                    calculatedPrice = basePrice * rentalDays;
                }

                // Add Deposit to Final Price for URL
                calculatedPrice += 4000;

                // Format for URL (eliminate decimals if needed, but 1.980 is string format in php)
                // We pass raw number, let PHP format or format here.
                // PHP expects a string. Let's send the raw number and formatting can happen there or here.
                // Let's send formatted string "1.250"
                finalPriceForUrl = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 0 }).format(calculatedPrice);
            }
        }

        const finishBtn = document.getElementById('finish-payment-btn');
        if (finishBtn) {
            finishBtn.onclick = function (e) {
                e.preventDefault();

                const receiptInput = document.getElementById('receipt-file');
                const statusDiv = document.getElementById('upload-status');

                if (!receiptInput || receiptInput.files.length === 0) {
                    alert('Lütfen ödeme dekontunu yükleyiniz!');
                    if (statusDiv) statusDiv.innerHTML = '<span style="color:red;"><i class="fa-solid fa-triangle-exclamation"></i> Lütfen dosya seçiniz.</span>';
                    return;
                }

                const file = receiptInput.files[0];
                const formData = new FormData();
                formData.append('receipt', file);

                if (statusDiv) statusDiv.innerHTML = '<span style="color:blue;"><i class="fa-solid fa-spinner fa-spin"></i> Yükleniyor...</span>';
                finishBtn.disabled = true;
                finishBtn.textContent = 'GÖNDERİLİYOR...';

                fetch('upload_receipt.php', {
                    method: 'POST',
                    body: formData
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            const currentSearch = window.location.search;
                            // Append new params
                            const newUrl = 'success.php' + currentSearch + '&final_price=' + encodeURIComponent(finalPriceForUrl) + '&car_name=' + encodeURIComponent(carNameForUrl) + '&p_date=' + encodeURIComponent(p_date) + '&r_date=' + encodeURIComponent(r_date);
                            window.location.href = newUrl;
                        } else {
                            alert('Hata: ' + data.message);
                            if (statusDiv) statusDiv.innerHTML = '<span style="color:red;">' + data.message + '</span>';
                            finishBtn.disabled = false;
                            finishBtn.textContent = 'ÖDEMEYİ YAPTIM, ONAYLA';
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        alert('Bir hata oluştu. Lütfen tekrar deneyin.');
                        if (statusDiv) statusDiv.innerHTML = '<span style="color:red;">Yükleme hatası.</span>';
                        finishBtn.disabled = false;
                        finishBtn.textContent = 'ÖDEMEYİ YAPTIM, ONAYLA';
                    });
            };
        }

        // Timer Logic with Persistence
        const TIMER_KEY = 'garenta_payment_timer';
        let targetTime = localStorage.getItem(TIMER_KEY);

        // If no timer or expired, set new
        if (!targetTime || Date.now() > parseInt(targetTime)) {
            targetTime = Date.now() + (30 * 60 * 1000); // 30 mins from now
            localStorage.setItem(TIMER_KEY, targetTime);
        } else {
            targetTime = parseInt(targetTime);
        }

        const minEl = document.getElementById('timer-min');
        const secEl = document.getElementById('timer-sec');

        const updateTimer = () => {
            const now = Date.now();
            let distance = targetTime - now;

            if (distance < 0) {
                clearInterval(timerInterval);
                minEl.textContent = "00";
                secEl.textContent = "00";
                localStorage.removeItem(TIMER_KEY);
                alert("Ödeme süresi doldu!");
                return;
            }

            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            minEl.textContent = minutes < 10 ? '0' + minutes : minutes;
            secEl.textContent = seconds < 10 ? '0' + seconds : seconds;
        };

        const timerInterval = setInterval(updateTimer, 1000);
        updateTimer(); // Initial call
    }

    // Rezervasyon Özeti Mantığı
    const summaryCard = document.querySelector('.summary-card');
    if (summaryCard && typeof DataManager !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const carId = urlParams.get('car_id');
        const rentalType = urlParams.get('type') || 'daily';

        // Date Params
        const p_date = urlParams.get('p_date') || '21.12.2025 10:00';
        const r_date = urlParams.get('r_date') || '24.12.2025 10:00';

        if (carId) {
            const cars = DataManager.getCars();
            const car = cars.find(c => c.id == carId);

            if (car) {
                // Days
                const rentalDays = calculateDays(p_date, r_date);

                // Price Calc
                let displayPrice;
                let isMonthly = (rentalType === 'monthly');

                // Show/Hide Payment Options
                const paymentOptsCard = document.getElementById('payment-options-card');
                if (paymentOptsCard) {
                    paymentOptsCard.style.display = isMonthly ? 'block' : 'none';
                }

                if (isMonthly) {
                    const dailyRate = car.priceOnline;
                    const totalBase = dailyRate * rentalDays;
                    let standardMonthly = totalBase * 0.70; // 30% Discount

                    // Check URL for upfront payment method
                    const pmUrl = urlParams.get('payment_method');
                    if (pmUrl === 'upfront') {
                        // Apply extra 15% discount on top (or as defined)
                        // Logic in payment-info-card (lines 504) says: calculatedPrice = calculatedPrice * 0.85;
                        standardMonthly = standardMonthly * 0.85;
                    }

                    displayPrice = standardMonthly;
                } else {
                    displayPrice = car.priceOnline * rentalDays;
                }

                // Resmi güncelle
                const imgEl = summaryCard.querySelector('.summary-car img');
                if (imgEl) {
                    imgEl.src = car.image;
                    imgEl.alt = car.name;
                }

                // Başlığı güncelle
                const titleEl = summaryCard.querySelector('.summary-car h4');
                if (titleEl) titleEl.textContent = car.name;

                // Etiketleri güncelle (Borderlı) + DEPOZİTO BİLGİSİ
                const tagContainer = summaryCard.querySelector('.car-tags');
                if (tagContainer) {
                    tagContainer.innerHTML = `
                        <span style="border:1px solid #E5E7EB; padding:4px 10px; border-radius:6px; font-size:0.8rem; background:#F9FAFB;">${car.segment}</span>
                        <span style="border:1px solid #E5E7EB; padding:4px 10px; border-radius:6px; font-size:0.8rem; background:#F9FAFB;">${car.fuel}</span>
                        <span style="border:1px solid #E5E7EB; padding:4px 10px; border-radius:6px; font-size:0.8rem; background:#F9FAFB;">${car.gear}</span>
                    `;
                }

                // Add or update Deposit Row in Summary
                // Check if deposit row already exists, if not add it before 'Toplam Tutar'
                // Actually let's reconstruct details or insert/find
                const summaryDetails = summaryCard.querySelector('.summary-details');
                let depositRow = summaryDetails.querySelector('.detail-row.deposit-row');

                if (!depositRow) {
                    // Create it if not exists, insert before 'hr' or last element
                    const hr = summaryDetails.querySelector('hr');
                    depositRow = document.createElement('div');
                    depositRow.className = 'detail-row deposit-row';
                    depositRow.style.marginBottom = '10px';
                    depositRow.style.color = '#374151';

                    if (hr) {
                        summaryDetails.insertBefore(depositRow, hr);
                    } else {
                        summaryDetails.appendChild(depositRow);
                    }
                }

                depositRow.innerHTML = `
                    <span>Depozito</span>
                    <strong>4.000 TL</strong>
                `;


                // Tarihleri Güncelle
                // Tarihleri Güncelle
                const detailRows = summaryCard.querySelectorAll('.summary-details .detail-row small');
                if (detailRows.length >= 2) {
                    detailRows[0].textContent = formatDate(p_date);
                    detailRows[1].textContent = formatDate(r_date);
                }

                // Lokasyonları Güncelle (İl bilgisini URL'den al)
                const city = urlParams.get('city');
                if (city) {
                    const locationRows = summaryCard.querySelectorAll('.summary-details .detail-row strong');
                    // Note: Since we added a deposit row with a strong tag, the indexing of 'strong' tags might shift if we select all.
                    // The first two 'detail-row' divs are Alış and İade. The deposit one is the 3rd.
                    // Let's target them more specifically or re-select based on structure.

                    // We know Alis is index 0, Iade is index 1 in .detail-row list (excluding total)
                    const rows = summaryCard.querySelectorAll('.detail-row');
                    if (rows[0]) {
                        const str = rows[0].querySelector('strong');
                        if (str) str.textContent = `${city} Havalimanı`;
                    }
                    if (rows[1]) {
                        const str = rows[1].querySelector('strong');
                        if (str) str.textContent = `${city} Havalimanı`;
                    }
                }

                // Toplam Tutarı Güncelle
                const totalRow = summaryCard.querySelector('.detail-row.total span:last-child');
                if (totalRow) {
                    // USER REQUEST: Listing.php ile aynı mantıkta toplam fiyat gösterilsin.
                    // Listing sadece kiralama bedelini gösteriyor. Depozito ayrı gösteriliyor.
                    // Bu yüzden Toplam Tutar'a depozito eklemiyoruz.

                    const depositPrice = 4000;
                    let finalPrice = displayPrice + depositPrice; // Standard: Rental + Deposit

                    totalRow.textContent = formatPrice(finalPrice) + ' TL';

                    // Payment Method Change Listener (defined in previous scope)
                    if (isMonthly && paymentOptsCard) {
                        const radios = paymentOptsCard.querySelectorAll('input[name="payment_method"]');
                        radios.forEach(radio => {
                            radio.addEventListener('change', function () {
                                if (this.value === 'upfront') {
                                    // Upfront: Discount on Rental part only, then add Deposit
                                    finalPrice = (displayPrice * 0.85) + depositPrice;
                                } else {
                                    finalPrice = displayPrice + depositPrice;
                                }
                                totalRow.textContent = formatPrice(finalPrice) + ' TL';
                            });
                        });
                    }
                }

                // Fiyat güncellemesi yukarıda (totalRow) yapıldığı için buradaki eski kod bloğu kaldırıldı.
            }
        }
    }
});



// Checkout Page Init Logic (Outside DOMContentLoaded if needed, but safe here)
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const custType = urlParams.get('cust_type');
    if (custType === 'corporate') {
        const corpDetails = document.getElementById('corporate-details');
        if (corpDetails) corpDetails.style.display = 'block';
    }
});

// Global Fonksiyon: Sonraki Adıma Git
function goToPaymentPage() {
    const form = document.getElementById('payment-form'); // Bu aslında driver-form olarak düşünülebilir checkout.php'de

    // Mevcut URL parametrelerini al
    const urlParams = new URLSearchParams(window.location.search);
    const deliveryType = urlParams.get('delivery') || 'valet';

    // Yeni form verilerini URL parametrelerine ekle
    const name = document.getElementById('driver-name')?.value;
    const surname = document.getElementById('driver-surname')?.value;
    const phone = document.getElementById('driver-phone')?.value;
    const tc = document.getElementById('driver-tc')?.value;
    const license = document.getElementById('driver-license')?.value;

    // Validation
    let isValid = true;
    const phoneError = document.getElementById('phone-error');
    const tcError = document.getElementById('tc-error');

    // Reset Errors
    if (phoneError) phoneError.style.display = 'none';
    if (tcError) tcError.style.display = 'none';

    if (phone && phone.length < 10) {
        if (phoneError) phoneError.style.display = 'block';
        isValid = false;
    }

    if (tc && tc.length !== 11) {
        if (tcError) tcError.style.display = 'block';
        isValid = false;
    }

    // HTML5 Form Validation
    if (form && !form.checkValidity()) {
        form.reportValidity();
        return;
    }

    if (!isValid) return; // Stop if custom validation failed

    if (name) urlParams.set('d_name', name);
    if (surname) urlParams.set('d_surname', surname);
    if (phone) urlParams.set('d_phone', phone);
    if (tc) urlParams.set('d_tc', tc);
    if (license) urlParams.set('d_license', license);

    // Address
    const address = document.getElementById('driver-address')?.value;
    if (address) urlParams.set('d_address', address);

    // Corporate Info
    const companyTitle = document.getElementById('company-title')?.value;
    const companyTax = document.getElementById('company-tax-no')?.value;
    if (companyTitle) urlParams.set('comp_title', companyTitle);
    if (companyTax) urlParams.set('comp_tax', companyTax);

    // Payment Method (Monthly)
    const paymentMethodRow = document.querySelector('input[name="payment_method"]:checked');
    if (paymentMethodRow) {
        urlParams.set('payment_method', paymentMethodRow.value);
    }

    // Ek Sürücü Bilgilerini Al
    const extraDriverCheck = document.getElementById('extra-driver-check');
    if (extraDriverCheck && extraDriverCheck.checked) {
        const edName = document.getElementById('extra-driver-name')?.value;
        const edSurname = document.getElementById('extra-driver-surname')?.value;
        const edLicense = document.getElementById('extra-driver-license')?.value;
        const edPhone = document.getElementById('extra-driver-phone')?.value;
        const edTc = document.getElementById('extra-driver-tc')?.value;

        if (edName) urlParams.set('ed_name', edName);
        if (edSurname) urlParams.set('ed_surname', edSurname);
        if (edLicense) urlParams.set('ed_license', edLicense);
        if (edPhone) urlParams.set('ed_phone', edPhone);
        if (edTc) urlParams.set('ed_tc', edTc);
    }

    // Parametreleri string'e çevir
    const queryString = urlParams.toString();

    if (deliveryType === 'airport') {
        // Havalimanı ise -> Teslimat sayfasına
        window.location.href = 'teslimat.php?' + queryString;
    } else {
        // Diğerleri (Vale) -> Ödeme sayfasına
        window.location.href = 'odeme.php?' + queryString;
    }
}

// --- WhatsApp Button Integration ---
// --- WhatsApp Button Integration ---
/*
document.addEventListener('DOMContentLoaded', function () {
    if (typeof DataManager !== 'undefined') {
        const contact = DataManager.getContact();
        const waNumber = contact.whatsapp || "905547208909"; // Default fallback

        // Create Button
        const waButton = document.createElement('a');
        waButton.href = `https://wa.me/${waNumber}`;
        waButton.target = "_blank";
        waButton.className = "whatsapp-sticky-button"; // Correct class
        waButton.innerHTML = `
            <i class="fa-brands fa-whatsapp"></i>
            <span>WhatsApp Destek Hattı</span>
        `;

        document.body.appendChild(waButton);
    }
});
*/
// script.js dosyasının en altına ekle:
document.addEventListener('DOMContentLoaded', () => {
    // Admin panelinden kaydedilen numarayı çek
    if (typeof DataManager !== 'undefined') {
        const contactData = DataManager.getContact();
        const waButtons = document.querySelectorAll('#dynamic-whatsapp-btn'); // Only keep dynamic if used elsewhere or remove entirely if not needed.
        // Assuming dynamic-whatsapp-btn might be used somewhere else or we can just remove sticky part.

        waButtons.forEach(btn => {
            if (contactData && contactData.whatsapp) {
                // Numaradaki tüm boşluk ve karakterleri temizle (sadece rakam kalsın)
                const cleanNumber = contactData.whatsapp.replace(/\D/g, '');
                btn.href = `https://wa.me/${cleanNumber}`;
            }
        });
    }
});