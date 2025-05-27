document.addEventListener('DOMContentLoaded', function() {
    // تبديل بين تبويبات القائمة
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // إزالة النشاط من جميع الروابط
            navLinks.forEach(l => l.classList.remove('active'));
            
            // إضافة النشاط للرابط الحالي
            this.classList.add('active');
            
            // إخفاء جميع أقسام المحتوى
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // إظهار القسم المحدد
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // تبويبات بطاقات اللغات في الصفحة الرئيسية
    const languageCards = document.querySelectorAll('.language-card');
    languageCards.forEach(card => {
        card.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            navLinks.forEach(l => l.classList.remove('active'));
            document.querySelector(`nav ul li a[data-tab="${tabId}"]`).classList.add('active');
            
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // تحديث معاينة HTML
    const htmlCode = document.querySelector('.html-code');
    const htmlPreview = document.querySelector('.html-preview');
    
    function updateHtmlPreview() {
        const code = htmlCode.value;
        htmlPreview.srcdoc = code;
    }
    
    htmlCode.addEventListener('input', updateHtmlPreview);
    updateHtmlPreview();
    
    // تحديث معاينة CSS
    const cssCode = document.querySelector('.css-code');
    const cssPreview = document.querySelector('.css-preview');
    
    function updateCssPreview() {
        const html = `<html><head><style>${cssCode.value}</style></head><body>
            <h1>عنوان تجريبي</h1>
            <p>هذه فقرة نصية لاختبار تنسيق CSS.</p>
            <a href="#">رابط تجريبي</a>
            </body></html>`;
        cssPreview.srcdoc = html;
    }
    
    cssCode.addEventListener('input', updateCssPreview);
    updateCssPreview();
    
    // تشغيل كود JavaScript
    window.runJS = function() {
        const jsCode = document.querySelector('.js-code').value;
        try {
            eval(jsCode);
        } catch (error) {
            alert('حدث خطأ: ' + error.message);
        }
    };
    
    // منطقة تجربة البرمجة
    const codeTabs = document.querySelectorAll('.code-tab');
    const playgroundCodes = document.querySelectorAll('.playground-code');
    
    codeTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            
            // تحديث التبويبات النشطة
            codeTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // تحديث محررات الأكواد النشطة
            playgroundCodes.forEach(code => code.classList.remove('active'));
            document.querySelector(`.playground-code[data-lang="${lang}"]`).classList.add('active');
        });
    });
    
    // تشغيل الكود في منطقة التجربة
    const runBtn = document.querySelector('.run-btn');
    const playgroundOutput = document.querySelector('.playground-output');
    
    runBtn.addEventListener('click', function() {
        const htmlCode = document.querySelector('.playground-code[data-lang="html"]').value;
        const cssCode = document.querySelector('.playground-code[data-lang="css"]').value;
        const jsCode = document.querySelector('.playground-code[data-lang="js"]').value;
        
        const fullCode = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>${cssCode}</style>
            </head>
            <body>
                ${htmlCode}
                <script>${jsCode}</script>
            </body>
            </html>
        `;
        
        playgroundOutput.srcdoc = fullCode;
    });
    
    // تشغيل الكود عند تحميل الصفحة إذا كان في قسم التجربة
    if (window.location.hash === '#playground') {
        document.querySelector('a[data-tab="playground"]').click();
    }
});