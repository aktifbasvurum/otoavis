/**
 * Data Management for Garenta Clone
 * Sunucu (database.json) ile LocalStorage arasında senkronizasyon sağlar.
 */

const DEFAULT_CARS = [
    // EKONOMİK
    { id: 101, name: "Citroen C3", segment: "EKONOMİK", fuel: "Benzin", gear: "Otomatik", people: 5, bags: 2, priceOffice: 1850, priceOnline: 1665, image: "https://www.avis.com.tr/Avis/media/Avis/Cars/f-citroen-c3.png" },
    { id: 102, name: "Citroen C4X", segment: "EKONOMİK", fuel: "Dizel/Benzin", gear: "Otomatik", people: 5, bags: 2, priceOffice: 2100, priceOnline: 1890, image: "https://www.avis.com.tr/Avis/media/Avis/Cars/ra-citroen-c4x.png" },
    { id: 103, name: "Fiat Egea", segment: "EKONOMİK", fuel: "Dizel/Benzin", gear: "Manuel", people: 5, bags: 2, priceOffice: 1600, priceOnline: 1440, image: "https://www.avis.com.tr/Avis/media/Avis/Cars/n-fiat-egea.png" },
    { id: 104, name: "Fiat Egea AT", segment: "EKONOMİK", fuel: "Dizel/Benzin", gear: "Otomatik", people: 5, bags: 2, priceOffice: 1900, priceOnline: 1710, image: "https://www.avis.com.tr/Avis/media/Avis/Cars/ra-fiat-egea-at.png" },
    { id: 105, name: "Fiat Egea Cross", segment: "EKONOMİK", fuel: "Benzin", gear: "Manuel", people: 5, bags: 1, priceOffice: 1750, priceOnline: 1575, image: "https://www.avis.com.tr/Avis/media/Avis/Cars/b-fiat-egea-cross.png" },
    { id: 106, name: "Hyundai i20", segment: "EKONOMİK", fuel: "Benzin", gear: "Otomatik", people: 5, bags: 2, priceOffice: 1800, priceOnline: 1620, image: "https://www.avis.com.tr/Avis/media/Avis/Cars/f-hyundai-i20.png" },
    { id: 107, name: "Opel Corsa", segment: "EKONOMİK", fuel: "Benzin", gear: "Otomatik", people: 5, bags: 2, priceOffice: 1950, priceOnline: 1755, image: "https://www.avis.com.tr/Avis/media/Avis/Cars/f-opel-corsa.png" },
    { id: 108, name: "Renault Clio", segment: "EKONOMİK", fuel: "Benzin", gear: "Manuel", people: 5, bags: 1, priceOffice: 1550, priceOnline: 1495, image: "https://www.avis.com.tr/Avis/media/Avis/Cars/b-renault-clio.png" },
    { id: 109, name: "Renault Clio AT", segment: "EKONOMİK", fuel: "Benzin", gear: "Otomatik", people: 5, bags: 2, priceOffice: 1850, priceOnline: 1665, image: "https://www.avis.com.tr/Avis/media/Avis/Cars/f-renault-clio-at.png" },
    { id: 110, name: "Seat Ibiza", segment: "EKONOMİK", fuel: "Benzin", gear: "Otomatik", people: 5, bags: 2, priceOffice: 2000, priceOnline: 1800, image: "https://www.avis.com.tr/Avis/media/Avis/Cars/f-seat-ibiza.png" },

    // KONFOR
    { id: 201, name: "Ford Focus", segment: "KONFOR", fuel: "Hybrid/Benzin/Dizel", gear: "Otomatik", people: 5, bags: 2, priceOffice: 2600, priceOnline: 2340, image: "https://www.avis.com.tr/Avis/media/Avis/Cars/o-ford-focus.png" },
    { id: 202, name: "Ford Puma", segment: "KONFOR", fuel: "Benzin", gear: "Otomatik", people: 5, bags: 2, priceOffice: 2800, priceOnline: 2520, image: "https://www.avis.com.tr/Avis/media/Avis/Cars/p-ford-puma.png" },
    { id: 203, name: "Opel Mokka", segment: "KONFOR", fuel: "Benzin", gear: "Otomatik", people: 5, bags: 2, priceOffice: 2900, priceOnline: 2610, image: "https://www.avis.com.tr/Avis/media/Avis/Cars/p-opel-mokka.png" },
    { id: 204, name: "Peugeot 2008", segment: "KONFOR", fuel: "Benzin", gear: "Otomatik", people: 5, bags: 2, priceOffice: 3000, priceOnline: 2700, image: "https://www.avis.com.tr/Avis/media/Avis/Cars/p-peugeot-2008.png" },
    { id: 205, name: "Peugeot 408", segment: "KONFOR", fuel: "Hybrid/Benzin/Dizel", gear: "Otomatik", people: 5, bags: 2, priceOffice: 3400, priceOnline: 3060, image: "https://www.avis.com.tr/Avis/media/Avis/Cars/o-peugeot-408.png" },
    { id: 206, name: "Toyota Corolla", segment: "KONFOR", fuel: "Hybrid/Benzin/Dizel", gear: "Otomatik", people: 5, bags: 2, priceOffice: 2700, priceOnline: 2430, image: "https://www.avis.com.tr/Avis/media/Avis/Cars/o-toyota-corolla.png" },

    // PRESTİJ
    { id: 301, name: "Audi A3", segment: "PRESTİJ", fuel: "Benzin", gear: "Otomatik", people: 5, bags: 1, priceOffice: 4200, priceOnline: 3780, image: "https://www.avis.com.tr/Avis/media/Avis/Cars/h-audi-a3.png" },
    { id: 302, name: "Bmw 2 Serisi", segment: "PRESTİJ", fuel: "Benzin", gear: "Otomatik", people: 5, bags: 1, priceOffice: 4400, priceOnline: 3960, image: "https://www.avis.com.tr/Avis/media/Avis/Cars/h-bmw-2-serisi.png" },
    { id: 303, name: "BYD SEAL U DM I", segment: "PRESTİJ", fuel: "Dizel/Benzin", gear: "Otomatik", people: 5, bags: 2, priceOffice: 4600, priceOnline: 4140, image: "https://www.avis.com.tr/Avis/media/Avis/Cars/d-byd-seal-u-dm-i.png" },
    { id: 304, name: "Chery Tiggo 7 Pro", segment: "PRESTİJ", fuel: "Dizel/Benzin", gear: "Otomatik", people: 5, bags: 2, priceOffice: 3800, priceOnline: 3420, image: "https://www.avis.com.tr/Avis/media/Avis/Cars/d-chery-tiggo-7-pro.png" },
    { id: 305, name: "Ford Kuga", segment: "PRESTİJ", fuel: "Dizel/Benzin", gear: "Otomatik", people: 5, bags: 2, priceOffice: 4000, priceOnline: 3600, image: "https://www.avis.com.tr/Avis/media/Avis/Cars/d-ford-kuga.png" },
    { id: 306, name: "MG HS", segment: "PRESTİJ", fuel: "Dizel/Benzin", gear: "Otomatik", people: 5, bags: 2, priceOffice: 3900, priceOnline: 3510, image: "https://www.avis.com.tr/Avis/media/Avis/Cars/d-mg-hs.png" },
    { id: 307, name: "Opel Grandland", segment: "PRESTİJ", fuel: "Dizel/Benzin", gear: "Otomatik", people: 5, bags: 2, priceOffice: 4100, priceOnline: 3690, image: "https://www.avis.com.tr/Avis/media/Avis/Cars/d-opel-grandland.png" },
    { id: 308, name: "Peugeot 3008", segment: "PRESTİJ", fuel: "Dizel/Benzin", gear: "Otomatik", people: 5, bags: 2, priceOffice: 4300, priceOnline: 3870, image: "https://www.avis.com.tr/Avis/media/Avis/Cars/d-peugeot-3008.png" },
    { id: 309, name: "Renault Austral", segment: "PRESTİJ", fuel: "Dizel/Benzin", gear: "Otomatik", people: 5, bags: 2, priceOffice: 4150, priceOnline: 3735, image: "https://www.avis.com.tr/Avis/media/Avis/Cars/d-renault-austral.png" },
    { id: 310, name: "Seat Ateca", segment: "PRESTİJ", fuel: "Dizel/Benzin", gear: "Otomatik", people: 5, bags: 2, priceOffice: 4100, priceOnline: 3690, image: "https://www.avis.com.tr/Avis/media/Avis/Cars/d-seat-ateca.png" },
    { id: 311, name: "Skoda Superb", segment: "PRESTİJ", fuel: "Benzin", gear: "Otomatik", people: 5, bags: 2, priceOffice: 4800, priceOnline: 4320, image: "https://www.avis.com.tr/Avis/media/Avis/Cars/j-skoda-superb.png" },
    { id: 312, name: "Toyota Corolla Cross", segment: "PRESTİJ", fuel: "Dizel/Benzin", gear: "Otomatik", people: 5, bags: 2, priceOffice: 4050, priceOnline: 3645, image: "https://www.avis.com.tr/Avis/media/Avis/Cars/d-toyota-corolla-cross.png" },

    // PREMIUM
    { id: 401, name: "Audi A6", segment: "PREMIUM", fuel: "Dizel/Benzin", gear: "Otomatik", people: 5, bags: 2, priceOffice: 7500, priceOnline: 6750, image: "https://www.avis.com.tr/Avis/media/Avis/Cars/e-audi-a6.png" },
    { id: 402, name: "Audi Q3", segment: "PREMIUM", fuel: "Benzin", gear: "Otomatik", people: 5, bags: 3, priceOffice: 6200, priceOnline: 5580, image: "https://www.avis.com.tr/Avis/media/Avis/Cars/m-audi-q3.png" },
    { id: 403, name: "BMW 3 Serisi", segment: "PREMIUM", fuel: "Benzin", gear: "Otomatik", people: 5, bags: 2, priceOffice: 7200, priceOnline: 6480, image: "https://www.avis.com.tr/Avis/media/Avis/Cars/c-bmw-3-serisi.png" },
    { id: 404, name: "BMW 5 Serisi", segment: "PREMIUM", fuel: "Dizel/Benzin", gear: "Otomatik", people: 5, bags: 2, priceOffice: 8500, priceOnline: 7650, image: "https://www.avis.com.tr/Avis/media/Avis/Cars/e-bmw-5-serisi.png" },
    { id: 405, name: "Ford Mustang Mach E", segment: "PREMIUM", fuel: "Elektrik", gear: "Otomatik", people: 5, bags: 2, priceOffice: 8000, priceOnline: 7200, image: "https://www.avis.com.tr/Avis/media/Avis/Cars/g-ford-mustang-mach-e.png" },
    { id: 406, name: "Maserati Grecale", segment: "PREMIUM", fuel: "Benzin", gear: "Otomatik", people: 5, bags: 3, priceOffice: 12000, priceOnline: 10800, image: "https://www.avis.com.tr/Avis/media/Avis/Cars/m-maserati-grecale.png" },
    { id: 407, name: "Peugeot 5008", segment: "PREMIUM", fuel: "Dizel/Benzin", gear: "Otomatik", people: 7, bags: 2, priceOffice: 6500, priceOnline: 5850, image: "https://www.avis.com.tr/Avis/media/Avis/Cars/l-peugeot-5008.png" },
    { id: 408, name: "Porsche Macan", segment: "PREMIUM", fuel: "Dizel/Benzin", gear: "Otomatik", people: 7, bags: 2, priceOffice: 11000, priceOnline: 9900, image: "https://www.avis.com.tr/Avis/media/Avis/Cars/l-porsche-macan.png" },
    { id: 409, name: "Volvo EX40", segment: "PREMIUM", fuel: "Elektrik", gear: "Otomatik", people: 5, bags: 2, priceOffice: 6800, priceOnline: 6120, image: "https://www.avis.com.tr/Avis/media/Avis/Cars/g-volvo-ex40.png" },
    { id: 410, name: "Volvo S60", segment: "PREMIUM", fuel: "Benzin", gear: "Otomatik", people: 5, bags: 2, priceOffice: 7000, priceOnline: 6300, image: "https://www.avis.com.tr/Avis/media/Avis/Cars/c-volvo-s60.png" },
    { id: 411, name: "Volvo XC40", segment: "PREMIUM", fuel: "Benzin", gear: "Otomatik", people: 5, bags: 3, priceOffice: 6900, priceOnline: 6210, image: "https://www.avis.com.tr/Avis/media/Avis/Cars/m-volvo-xc40.png" },

    // LÜKS
    { id: 501, name: "Maserati Levante", segment: "LÜKS", fuel: "Benzin", gear: "Otomatik", people: 7, bags: 3, priceOffice: 15000, priceOnline: 13500, image: "https://www.avis.com.tr/Avis/media/Avis/Cars/k-maserati-levante.png" },
    { id: 502, name: "Volvo XC90", segment: "LÜKS", fuel: "Benzin", gear: "Otomatik", people: 7, bags: 3, priceOffice: 14000, priceOnline: 12600, image: "https://www.avis.com.tr/Avis/media/Avis/Cars/k-volvo-xc90.png" },

    // VAN
    { id: 601, name: "Fiat Ulysee", segment: "VAN", fuel: "Dizel/Benzin", gear: "Otomatik", people: 9, bags: 1, priceOffice: 5000, priceOnline: 4500, image: "https://www.avis.com.tr/Avis/media/Avis/Cars/i-fiat-ulysee.png" },
    { id: 602, name: "Ford Ranger", segment: "VAN", fuel: "Dizel/Benzin", gear: "Otomatik", people: 9, bags: 1, priceOffice: 5500, priceOnline: 4950, image: "https://www.avis.com.tr/Avis/media/Avis/Cars/i-ford-ranger.png" }
];

const DEFAULT_IBAN = {
    bankName: "TR Garenta Bankası",
    iban: "TR00 0000 0000 0000 0000 0000 00",
    recipient: "Garenta Ulaşım Çözümleri A.Ş."
};

/*
const DEFAULT_CONTACT = {
    whatsapp: "905555555555"
};
*/

const DataManager = {
    initAutoSync: async function () {
        if (window.isSyncing) return; // Çifte çalışmayı önle
        window.isSyncing = true;
        try {
            // Cache-busting ile sunucudan veri çek
            const response = await fetch('admin.php?api=get_all&t=' + Date.now());
            if (!response.ok) return;

            const serverData = await response.json();
            if (!serverData || !serverData.cars) return;

            // Mevcut verilerle kıyasla
            const localCars = localStorage.getItem('garenta_cars');
            const serverCars = JSON.stringify(serverData.cars);

            const localIban = localStorage.getItem('garenta_iban');
            const serverIban = JSON.stringify(serverData.iban);

            const localContact = localStorage.getItem('garenta_contact');
            const serverContact = JSON.stringify(serverData.contact);

            let hasChange = false;

            // Fark varsa güncelle
            if (localCars !== serverCars) {
                localStorage.setItem('garenta_cars', serverCars);
                hasChange = true;
            }
            if (localIban !== serverIban) {
                localStorage.setItem('garenta_iban', serverIban);
                hasChange = true;
            }
            if (localContact !== serverContact) {
                localStorage.setItem('garenta_contact', serverContact);
                hasChange = true;
            }

            if (hasChange) {
                console.log("Veri güncellendi, sayfa yenileniyor...");
                // Sonsuz döngüye girmemesi için çok kısa bir süre sonra yenile
                // Ama eğer form dolduruyorsa (checkout gibi) yenilemek kötü olabilir.
                // Yine de kullanıcı "güncel değil" şikayeti yapıyor, yenilemek en garantisi.
                // Sadece veriyi güncellemek yetmez çünkü DOM eski veriyle render oldu.
                location.reload();
            }
        } catch (e) {
            console.error("Auto Sync Failed", e);
        }
    },

    // Sununuya veri gönderen fonksiyon (GERİ EKLENDİ)
    syncToServer: async function () {
        const data = {
            cars: this.getCars(),
            iban: this.getIBAN(),
            contact: this.getContact()
        };
        try {
            await fetch('admin.php?api=save_all', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        } catch (e) {
            console.error("Sync to server failed", e);
        }
    },

    getCars: function () {
        const stored = localStorage.getItem('garenta_cars');
        // Eğer LocalStorage boşsa veya '[]' ise DEFAULT_CARS döndür
        if (!stored || JSON.parse(stored).length === 0) {
            return DEFAULT_CARS;
        }
        return JSON.parse(stored);
    },

    saveCars: function (cars) {
        localStorage.setItem('garenta_cars', JSON.stringify(cars));
        this.syncToServer(); // Değişikliği sunucuya it
    },

    addCar: function (car) {
        const cars = this.getCars();
        car.id = Date.now();
        cars.push(car);
        this.saveCars(cars);
    },

    deleteCar: function (id) {
        let cars = this.getCars();
        cars = cars.filter(c => c.id != id);
        this.saveCars(cars);
    },

    updateCar: function (updatedCar) {
        let cars = this.getCars();
        const index = cars.findIndex(c => c.id == updatedCar.id);
        if (index !== -1) {
            cars[index] = updatedCar;
            this.saveCars(cars);
            return true;
        }
        return false;
    },

    getIBAN: function () {
        const stored = localStorage.getItem('garenta_iban');
        return stored ? JSON.parse(stored) : DEFAULT_IBAN;
    },

    saveIBAN: function (ibanData) {
        localStorage.setItem('garenta_iban', JSON.stringify(ibanData));
        this.syncToServer();
    },

    getContact: function () {
        const stored = localStorage.getItem('garenta_contact');
        return stored ? JSON.parse(stored) : DEFAULT_CONTACT;
    },

    saveContact: function (contactData) {
        localStorage.setItem('garenta_contact', JSON.stringify(contactData));
        this.syncToServer();
    }
};