// --- 1. ตัวแปรเก็บคะแนน ---
let totalSum = 0; 

// --- 2. จัดการแผงปุ่มวงกลม (เก็บคะแนน) ---
const controlPanel = document.querySelector('.control-panel');

controlPanel.addEventListener('click', (e) => {
    // หาว่าเราคลิกโดนปุ่ม <use> ตัวไหน
    const clicked = e.target.closest('use');
    if (!clicked) return; // ถ้าไม่โดนปุ่มอะไรเลย ก็ไม่ต้องทำอะไร

    const href = clicked.getAttribute('href');

    // เช็คว่าถ้าปุ่มที่กด มีชื่อขึ้นต้นด้วย #n. (เช่น #n.5, #n.10)
    if (href && href.includes('#n.')) {
        // ดึงตัวเลขออกมาจากชื่อ ID
        const value = parseInt(href.replace('#n.', ''));
        
        // บวกคะแนนเพิ่มเข้าไป
        totalSum += value;
        console.log("คะแนนสะสมตอนนี้คือ:", totalSum);

        // ทำ Effect ให้ปุ่มดูเหมือนโดนกด (กะพริบนิดนึง)
        clicked.style.opacity = "0.5";
        setTimeout(() => { clicked.style.opacity = "1"; }, 100);
    }
});

// --- 3. จัดการปุ่ม SUBMIT (แยกต่างหาก) ---
// มั่นใจว่าใน HTML ใส่ id="submit-trigger" ไว้ที่ตัวปุ่ม Submit นะครับ
const submitBtn = document.getElementById('submit-trigger');

submitBtn.addEventListener('click', () => {
    // ถ้ายังไม่มีใครกดเลขเลย ให้เตือนก่อน
    if (totalSum === 0) {
        alert("ยังไม่ได้เลือกชั้นเลยครับ!");
        return;
    }

    // เรียกฟังก์ชันแสดงผลลัพธ์
    showResult();
});

// --- 4. ฟังก์ชันแสดงหน้าต่างผลลัพธ์ ---
function showResult() {
    // ใส่ตัวเลขผลรวมลงไปในกล่องสี่เหลี่ยม (Digital Number)
    const display = document.getElementById('final-sum');
    if (display) {
        display.innerText = totalSum;
    }

    // สั่งให้แผงปุ่มและปุ่ม Submit เล่น Animation "หายตัวไป" (popOut)
    controlPanel.style.animation = "popOut 0.5s ease forwards";
    submitBtn.style.animation = "popOut 0.5s ease forwards";

    // รอ 0.6 วินาที (ให้ปุ่มหายไปก่อน) แล้วค่อยโชว์หน้าจอผลลัพธ์
    setTimeout(() => {
        const modal = document.getElementById('result-screen');
        if (modal) {
            modal.classList.add('show'); // สั่งให้ CSS แสดงหน้าจอเด้งขึ้นมา
        }
    }, 600);
}
