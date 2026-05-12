const cars = [
    { id: 1, name: "Renault Megane", price: "1,000.00", image: "megane.png", type: "Sedan", fuel: "Dizel", transmission: "Otomatik", capacity: "384 lt", year: "2025" },
    { id: 2, name: "Honda Civic", price: "1,500.00", image: "civic.png", type: "Sedan", fuel: "Dizel", transmission: "Otomatik", capacity: "512 lt", year: "2025" },
    { id: 3, name: "Ford Focus", price: "1,000.00", image: "focus.png", type: "Sedan", fuel: "Dizel", transmission: "Otomatik", capacity: "385 lt", year: "2025" },
    { id: 4, name: "Volkswagen Jetta", price: "1,400.00", image: "jetta.png", type: "Sedan", fuel: "Dizel", transmission: "Otomatik", capacity: "510 lt", year: "2025" },
    { id: 5, name: "Peugeot 2008", price: "1,500.00", image: "p2008.png", type: "SUV", fuel: "Dizel", transmission: "Otomatik", capacity: "434 lt", year: "2025" },
    { id: 6, name: "Citroen AirCross", price: "1,500.00", image: "aircross.png", type: "SUV", fuel: "Dizel", transmission: "Otomatik", capacity: "1600 lt", year: "2025" },
    { id: 7, name: "Peugeot 3008", price: "1,500.00", image: "p3008.png", type: "SUV", fuel: "Dizel", transmission: "Otomatik", capacity: "520 lt", year: "2025" },
    { id: 8, name: "Opel Crossland", price: "1,500.00", image: "crossland.png", type: "SUV", fuel: "Dizel", transmission: "Otomatik", capacity: "510 lt", year: "2025" },
    { id: 9, name: "Renault Kadjar", price: "1,500.00", image: "kadjar.png", type: "SUV", fuel: "Dizel", transmission: "Otomatik", capacity: "472 lt", year: "2025" },
    { id: 10, name: "Renault Duster", price: "1,200.00", image: "duster.png", type: "SUV", fuel: "Dizel", transmission: "Otomatik", capacity: "520 lt", year: "2025" },
    { id: 11, name: "Skoda Kodiaq", price: "1,700.00", image: "kodiaq.png", type: "SUV", fuel: "Dizel", transmission: "Otomatik", capacity: "720 lt", year: "2025" },
    { id: 12, name: "Opel Mokka", price: "1,800.00", image: "mokka.png", type: "SUV", fuel: "Benzin", transmission: "Otomatik", capacity: "356 lt", year: "2025" },
    { id: 13, name: "BMW 116i", price: "2,500.00", image: "bmw116.png", type: "Hatchback", fuel: "Dizel", transmission: "Otomatik", capacity: "300 lt", year: "2025" },
    { id: 14, name: "Fiat Egea", price: "750.00", image: "egea.png", type: "Sedan", fuel: "Dizel", transmission: "Manuel", capacity: "500 lt", year: "2025" },
    { id: 15, name: "BMW X1", price: "2,500.00", image: "bmwx1_transparent.png", type: "SUV", fuel: "Dizel", transmission: "Otomatik", capacity: "500 lt", year: "2025" },
    
    // Ekran görüntülerinden eklenen yeni araçlar
    { id: 16, name: "Citroen C3", price: "900.00", image: "c3_cover.png", type: "Hatchback", fuel: "Benzin", transmission: "Otomatik", capacity: "2 Bavul", year: "2025" },
    { id: 17, name: "Citroen C4X", price: "1,200.00", image: "c4x_cover.png", type: "Sedan", fuel: "Dizel/Benzin", transmission: "Otomatik", capacity: "2 Bavul", year: "2025" },
    { id: 18, name: "Fiat Egea AT", price: "950.00", image: "egeaat_cover.png", type: "Sedan", fuel: "Dizel/Benzin", transmission: "Otomatik", capacity: "2 Bavul", year: "2025" },
    { id: 19, name: "Fiat Egea Cross", price: "1,050.00", image: "egeacross_cover.png", type: "SUV", fuel: "Benzin", transmission: "Manuel", capacity: "1 Bavul", year: "2025" },
    { id: 20, name: "Hyundai i20", price: "900.00", image: "i20_cover.png", type: "Hatchback", fuel: "Benzin", transmission: "Otomatik", capacity: "2 Bavul", year: "2025" },
    { id: 21, name: "Opel Corsa", price: "950.00", image: "corsa_cover.png", type: "Hatchback", fuel: "Benzin", transmission: "Otomatik", capacity: "2 Bavul", year: "2025" },
    { id: 22, name: "Renault Clio AT", price: "900.00", image: "clio_cover.png", type: "Hatchback", fuel: "Benzin", transmission: "Otomatik", capacity: "2 Bavul", year: "2025" },
    { id: 23, name: "Seat Ibiza", price: "950.00", image: "ibiza_cover.png", type: "Hatchback", fuel: "Benzin", transmission: "Otomatik", capacity: "2 Bavul", year: "2025" },
    { id: 24, name: "Ford Puma", price: "1,300.00", image: "puma_cover.png", type: "SUV", fuel: "Benzin", transmission: "Otomatik", capacity: "2 Bavul", year: "2025" },
    { id: 25, name: "Peugeot 408", price: "1,800.00", image: "p408_cover.png", type: "Sedan", fuel: "Hybrid/Benzin/Dizel", transmission: "Otomatik", capacity: "2 Bavul", year: "2025" },
    { id: 26, name: "Toyota Corolla", price: "1,400.00", image: "corolla_cover.png", type: "Sedan", fuel: "Hybrid/Benzin/Dizel", transmission: "Otomatik", capacity: "2 Bavul", year: "2025" },
    { id: 27, name: "Audi A3", price: "2,000.00", image: "a3_cover.png", type: "Sedan", fuel: "Benzin", transmission: "Otomatik", capacity: "1 Bavul", year: "2025" },
    { id: 28, name: "BMW 2 Serisi", price: "2,200.00", image: "bmw2_cover.png", type: "Sedan", fuel: "Benzin", transmission: "Otomatik", capacity: "1 Bavul", year: "2025" },
    { id: 29, name: "BYD SEAL U DM I", price: "2,500.00", image: "byd_cover.png", type: "SUV", fuel: "Dizel/Benzin", transmission: "Otomatik", capacity: "2 Bavul", year: "2025" },
    { id: 30, name: "Ford Kuga", price: "1,800.00", image: "kuga_cover.png", type: "SUV", fuel: "Dizel/Benzin", transmission: "Otomatik", capacity: "2 Bavul", year: "2025" },
    { id: 31, name: "Jeep Compass", price: "1,900.00", image: "compass_cover.png", type: "SUV", fuel: "Dizel/Benzin", transmission: "Otomatik", capacity: "2 Bavul", year: "2025" },
    { id: 32, name: "MG HS", price: "1,600.00", image: "mghs_cover.png", type: "SUV", fuel: "Dizel/Benzin", transmission: "Otomatik", capacity: "2 Bavul", year: "2025" },
    { id: 33, name: "Opel Grandland", price: "1,700.00", image: "grandland_cover.png", type: "SUV", fuel: "Dizel/Benzin", transmission: "Otomatik", capacity: "2 Bavul", year: "2025" },
    { id: 34, name: "Renault Austral", price: "1,800.00", image: "austral_cover.png", type: "SUV", fuel: "Dizel/Benzin", transmission: "Otomatik", capacity: "2 Bavul", year: "2025" },
    { id: 35, name: "Seat Ateca", price: "1,600.00", image: "ateca_cover.png", type: "SUV", fuel: "Dizel/Benzin", transmission: "Otomatik", capacity: "2 Bavul", year: "2025" },
    { id: 36, name: "Skoda Superb", price: "2,100.00", image: "superb_cover.png", type: "Sedan", fuel: "Benzin", transmission: "Otomatik", capacity: "2 Bavul", year: "2025" },
    { id: 37, name: "Toyota Corolla Cross", price: "1,700.00", image: "corollacross_cover.png", type: "SUV", fuel: "Dizel/Benzin", transmission: "Otomatik", capacity: "2 Bavul", year: "2025" },
    { id: 38, name: "Audi A6", price: "3,500.00", image: "a6_cover.png", type: "Sedan", fuel: "Dizel/Benzin", transmission: "Otomatik", capacity: "2 Bavul", year: "2025" },
    { id: 39, name: "BMW 3 Serisi", price: "2,800.00", image: "bmw3_cover.png", type: "Sedan", fuel: "Benzin", transmission: "Otomatik", capacity: "2 Bavul", year: "2025" },
    { id: 40, name: "BMW 5 Serisi", price: "4,000.00", image: "bmw5_cover.png", type: "Sedan", fuel: "Dizel/Benzin", transmission: "Otomatik", capacity: "2 Bavul", year: "2025" },
    { id: 41, name: "BMW iX1", price: "3,000.00", image: "ix1_cover.png", type: "SUV", fuel: "Elektrik", transmission: "Otomatik", capacity: "2 Bavul", year: "2025" },
    { id: 42, name: "Peugeot 5008", price: "2,200.00", image: "p5008_cover.png", type: "SUV", fuel: "Dizel/Benzin", transmission: "Otomatik", capacity: "2 Bavul (7 Kişi)", year: "2025" },
    { id: 43, name: "Volvo EX40", price: "2,800.00", image: "ex40_cover.png", type: "SUV", fuel: "Elektrik", transmission: "Otomatik", capacity: "2 Bavul", year: "2025" },
    { id: 44, name: "Volvo S60", price: "2,900.00", image: "s60_cover.png", type: "Sedan", fuel: "Benzin", transmission: "Otomatik", capacity: "2 Bavul", year: "2025" },
    { id: 45, name: "Volvo XC60", price: "3,500.00", image: "xc60_cover.png", type: "SUV", fuel: "Benzin", transmission: "Otomatik", capacity: "3 Bavul", year: "2025" },
    { id: 46, name: "Volvo XC90", price: "4,500.00", image: "xc90_cover.png", type: "SUV", fuel: "Benzin", transmission: "Otomatik", capacity: "3 Bavul (7 Kişi)", year: "2025" },
    { id: 47, name: "Fiat Ulysee", price: "2,000.00", image: "ulysee_cover.png", type: "Van", fuel: "Dizel/Benzin", transmission: "Otomatik", capacity: "1 Bavul (9 Kişi)", year: "2025" },
    { id: 48, name: "Ford Ranger", price: "2,500.00", image: "ranger_cover.png", type: "Pickup", fuel: "Dizel/Benzin", transmission: "Otomatik", capacity: "3 Bavul", year: "2025" }
];

document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("cars-grid");
    const countEl = document.getElementById("car-count");
    const searchInput = document.getElementById("searchInput");
    
    function renderCars(carsToRender) {
        if (!grid) return;
        
        grid.innerHTML = "";
        if(countEl) countEl.innerText = carsToRender.length;
        
        if(carsToRender.length === 0) {
            grid.innerHTML = "<div style='grid-column: 1/-1; text-align:center; padding: 2rem; color:#666;'>Aradığınız kriterlere uygun araç bulunamadı.</div>";
            return;
        }

        carsToRender.forEach(car => {
            const card = document.createElement('div');
            card.className = 'car-card';
            card.innerHTML = `
                <img src="assets/${car.image}" alt="${car.name}" class="car-image" onclick="window.location.href='arac-detay.html?id=${car.id}'">
                <div class="car-header">
                    <div class="car-name" onclick="window.location.href='arac-detay.html?id=${car.id}'">${car.name}</div>
                    <div class="car-price" style="text-align: right;">${car.price} TL<br><span style="font-size:0.6rem; color:#999; font-weight:normal;">(Günlük, KDV Hariç)</span></div>
                </div>
                <div class="car-features">
                    <div class="feature">
                        <i class="fas fa-car-side"></i>
                        <span style="font-size:0.6rem; font-weight:bold; color:#d4002a;">KASA</span>
                        <span>${car.type}</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-gas-pump"></i>
                        <span style="font-size:0.6rem; font-weight:bold; color:#d4002a;">YAKIT</span>
                        <span>${car.fuel}</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-cogs"></i>
                        <span style="font-size:0.6rem; font-weight:bold; color:#d4002a;">ŞANZIMAN</span>
                        <span>${car.transmission}</span>
                    </div>
                    <div class="feature">
                        <i class="far fa-calendar-alt"></i>
                        <span style="font-size:0.6rem; font-weight:bold; color:#d4002a;">YIL</span>
                        <span>${car.year}</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-suitcase"></i>
                        <span style="font-size:0.6rem; font-weight:bold; color:#d4002a;">KAPASİTE</span>
                        <span>${car.capacity}</span>
                    </div>
                </div>
                <div class="action-buttons">
                    <a href="tel:+905436348331" class="btn btn-red">HEMEN ARA</a>
                    <a href="https://wa.me/905436348331?text=Merhaba, ${car.name} aracı hakkında bilgi almak istiyorum." class="btn btn-green">WHATSAPP</a>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    // Initial render
    renderCars(cars);

    // Search logic
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const val = e.target.value.toLowerCase();
            const filtered = cars.filter(c => c.name.toLowerCase().includes(val));
            renderCars(filtered);
        });
    }
});
