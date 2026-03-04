(function() {
      // -------------------- بيانات الأشياء --------------------
      const randomItems = {
        car: { name: '🚗 سيارة', emoji: '🚗' },
        phone: { name: '📱 جوال', emoji: '📱' },
        pizza: { name: '🍕 بيتزا', emoji: '🍕' },
        astronaut: { name: '👨‍🚀 رائد فضاء', emoji: '👨‍🚀' },
        satellite: { name: '🛰️ قمر صناعي', emoji: '🛰️' },
        magnet: { name: '🧲 مغناطيس', emoji: '🧲' },
        photon: { name: '✨ فوتون', emoji: '✨' },
        antimatter: { name: '⚛️ مضاد مادة', emoji: '⚛️' },
        unicorn: { name: '🦄 يونيكورن', emoji: '🦄' },
        book: { name: '📚 كتاب', emoji: '📚' },
        cat: { name: '🐱 قط', emoji: '🐱' },
        diamond: { name: '💎 ألماسة', emoji: '💎' },
        burger: { name: '🍔 برجر', emoji: '🍔' },
        rocket: { name: '🚀 صاروخ', emoji: '🚀' },
        ufo: { name: '🛸 طبق طائر', emoji: '🛸' }
      };

      // -------------------- عناصر السلايدرات --------------------
      const bhSlider = document.getElementById('bhSlider');
      const nsSlider = document.getElementById('nsSlider');
      const whSlider = document.getElementById('whSlider');
      
      const bhDistLabel = document.getElementById('bhDistanceLabel');
      const nsDistLabel = document.getElementById('nsDistanceLabel');
      const whDistLabel = document.getElementById('whDistanceLabel');
      
      const bhRedshift = document.getElementById('bhRedshift');
      const bhTime = document.getElementById('bhTime');
      const bhDistortion = document.getElementById('bhDistortion');
      const bhRedshiftBar = document.getElementById('bhRedshiftBar');
      
      const nsRedshift = document.getElementById('nsRedshift');
      const nsTime = document.getElementById('nsTime');
      const nsDistortion = document.getElementById('nsDistortion');
      const nsRedshiftBar = document.getElementById('nsRedshiftBar');
      
      const whRedshift = document.getElementById('whRedshift');
      const whTime = document.getElementById('whTime');
      const whDistortion = document.getElementById('whDistortion');
      const whRedshiftBar = document.getElementById('whRedshiftBar');

      // -------------------- دوال التحديث (الازاحة) --------------------
      function updateBlackHole(value) {
        let p = value / 100;
        let z = 0.1 + p * 4.5;
        bhRedshift.innerText = 'z=' + z.toFixed(2);
        bhRedshiftBar.style.width = Math.min(100, (z/5.0)*100) + '%';
        let timeDil = 1.0 - p * 0.8;
        if (timeDil < 0.15) timeDil = 0.15;
        bhTime.innerText = timeDil.toFixed(2) + 'x';
        let distort = p < 0.3 ? 'خفيف' : (p < 0.6 ? 'متوسط' : (p < 0.85 ? 'شديد' : 'مشوه جداً'));
        bhDistortion.innerText = distort;
        bhDistLabel.innerText = value + '%';
      }

      function updateNeutron(value) {
        let p = value / 100;
        let z = 0.15 + p * 2.2;
        nsRedshift.innerText = 'z=' + z.toFixed(2);
        nsRedshiftBar.style.width = (z / 3.5) * 100 + '%';
        let timeDil = 1.0 - p * 0.5;
        if (timeDil < 0.4) timeDil = 0.4;
        nsTime.innerText = timeDil.toFixed(2) + 'x';
        let distort = p < 0.3 ? 'خفيف' : (p < 0.6 ? 'نبض' : 'التواء');
        nsDistortion.innerText = distort;
        nsDistLabel.innerText = value + '%';
      }

      function updateWhiteHole(value) {
        let p = value / 100;
        let blueshift = -0.05 - p * 0.4;
        whRedshift.innerText = 'z=' + blueshift.toFixed(2);
        let barWidth = p * 100;
        whRedshiftBar.style.width = barWidth + '%';
        let timeFactor = 1.0 + p * 0.8;
        whTime.innerText = timeFactor.toFixed(2) + 'x';
        let distort = p < 0.3 ? 'طرد' : (p < 0.6 ? 'انبعاج' : 'تمزق ضوئي');
        whDistortion.innerText = distort;
        whDistLabel.innerText = value + '%';
      }

      // ربط السلايدرات
      bhSlider.addEventListener('input', (e) => updateBlackHole(e.target.value));
      nsSlider.addEventListener('input', (e) => updateNeutron(e.target.value));
      whSlider.addEventListener('input', (e) => updateWhiteHole(e.target.value));
      
      // قيم أولية
      updateBlackHole(50);
      updateNeutron(50);
      updateWhiteHole(50);

      // -------------------- نظام السجل --------------------
      function addToLog(message, type = 'info') {
        const log = document.getElementById('eventLog');
        const entry = document.createElement('div');
        entry.className = type === 'important' ? 'text-yellow-300 font-bold' : 'text-gray-300';
        const now = new Date();
        const timeStr = now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        entry.innerHTML = `⏱️ ${timeStr} - ${message}`;
        log.appendChild(entry);
        log.scrollTop = log.scrollHeight;
        while (log.children.length > 12) log.removeChild(log.children[0]);
      }
      window.clearLog = function() {
        document.getElementById('eventLog').innerHTML = '<div class="text-gray-500">✨ تم مسح السجل...</div>';
      };

      // -------------------- دالة الرمي (مدمجة مع السلايدرات) --------------------
      window.throwItem = function(zone, itemType) {
        let container, messageDiv, zoneName;
        if (zone === 'blackhole') {
          container = document.getElementById('blackholeItems');
          messageDiv = document.getElementById('blackholeMessage');
          zoneName = 'الثقب الأسود';
        } else if (zone === 'neutron') {
          container = document.getElementById('neutronItems');
          messageDiv = document.getElementById('neutronMessage');
          zoneName = 'النجم النيوتروني';
        } else if (zone === 'whitehole') {
          container = document.getElementById('whiteholeItems');
          messageDiv = document.getElementById('whiteholeMessage');
          zoneName = 'الثقب الأبيض';
        } else return;
        
        if (!container) return;
        
        let finalItem;
        if (itemType === 'random') {
          const keys = Object.keys(randomItems);
          const randomKey = keys[Math.floor(Math.random() * keys.length)];
          finalItem = randomItems[randomKey];
        } else {
          finalItem = randomItems[itemType] || { name: '❓ شيء', emoji: '❓' };
        }
        
        const item = document.createElement('div');
        item.className = 'random-item';
        item.innerHTML = finalItem.emoji;
        item.setAttribute('data-name', finalItem.name);
        
        const leftPos = 20 + Math.random() * 60;
        const topPos = 20 + Math.random() * 60;
        item.style.left = leftPos + '%';
        item.style.top = topPos + '%';
        
        container.appendChild(item);
        messageDiv.innerHTML = `✨ رمي ${finalItem.name}`;
        addToLog(`🎲 رمي ${finalItem.name} في ${zoneName}`);
        
        // السحب والإسقاط
        let isDragging = false;
        let offsetX, offsetY;
        
        item.addEventListener('mousedown', (e) => {
          e.preventDefault();
          isDragging = true;
          const rect = item.getBoundingClientRect();
          offsetX = e.clientX - rect.left;
          offsetY = e.clientY - rect.top;
          item.style.cursor = 'grabbing';
          item.style.transition = 'none';
          document.body.style.userSelect = 'none';
        });
        
        const mouseMove = (e) => {
          if (!isDragging) return;
          e.preventDefault();
          const containerRect = container.getBoundingClientRect();
          let x = e.clientX - containerRect.left - offsetX;
          let y = e.clientY - containerRect.top - offsetY;
          x = Math.max(0, Math.min(containerRect.width - 50, x));
          y = Math.max(0, Math.min(containerRect.height - 50, y));
          item.style.left = (x / containerRect.width * 100) + '%';
          item.style.top = (y / containerRect.height * 100) + '%';
        };
        
        const mouseUp = (e) => {
          if (!isDragging) return;
          isDragging = false;
          item.style.cursor = 'grab';
          item.style.transition = 'all 0.3s';
          document.body.style.userSelect = '';
          
          const containerRect = container.getBoundingClientRect();
          const itemRect = item.getBoundingClientRect();
          const centerX = containerRect.left + containerRect.width/2;
          const centerY = containerRect.top + containerRect.height/2;
          const itemCenterX = itemRect.left + itemRect.width/2;
          const itemCenterY = itemRect.top + itemRect.height/2;
          const distance = Math.hypot(itemCenterX - centerX, itemCenterY - centerY);
          
          if (distance < 70) {
            item.style.pointerEvents = 'none';
            let resultMessage = '', logMsg = '';
            const itemName = finalItem.name;
            
            if (zone === 'blackhole') {
              const outcomes = [`${itemName} 🍝 تمطى سباغيتي!`, `${itemName} ⚫ اختفى خلف الأفق!`, `${itemName} ⏳ تمدد زمنياً!`];
              resultMessage = outcomes[Math.floor(Math.random() * outcomes.length)];
              logMsg = `⚫ ${itemName} دخل الثقب الأسود`;
              item.classList.add('spaghettification');
            } else if (zone === 'neutron') {
              const outcomes = [`${itemName} 💥 تحول إلى نبضة!`, `${itemName} ⚡ تمزق ذرياً!`, `${itemName} 🧪 سحق نووياً!`];
              resultMessage = outcomes[Math.floor(Math.random() * outcomes.length)];
              logMsg = `💫 ${itemName} عند النيوتروني`;
              item.classList.add('quantum-tear');
            } else {
              const outcomes = [`${itemName} 💨 انقذف خارج الكون!`, `${itemName} ✨ انبعث بعنف!`, `${itemName} 🌌 قذف لبعد آخر!`];
              resultMessage = outcomes[Math.floor(Math.random() * outcomes.length)];
              logMsg = `⬜ ${itemName} والثقب الأبيض`;
              item.classList.add('white-emission');
            }
            
            messageDiv.innerHTML = `🎯 ${resultMessage}`;
            addToLog(logMsg, 'important');
            setTimeout(() => item.remove(), 1800);
          }
        };
        
        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);
        
        setTimeout(() => {
          if (item.parentNode) {
            item.remove();
            document.removeEventListener('mousemove', mouseMove);
            document.removeEventListener('mouseup', mouseUp);
            addToLog(`⌛ ${finalItem.name} ضاع في الفضاء...`);
          }
        }, 20000);
      };

      // -------------------- خلفية نجوم --------------------
      for (let i = 0; i < 70; i++) {
        const s = document.createElement('div');
        s.className = 'star';
        s.style.width = (Math.random()*3+1)+'px';
        s.style.height = s.style.width;
        s.style.left = Math.random()*100+'%';
        s.style.top = Math.random()*100+'%';
        s.style.opacity = Math.random()*0.7+0.3;
        s.style.animation = `twinkle ${Math.random()*5+3}s infinite`;
        document.body.appendChild(s);
      }
      const style = document.createElement('style');
      style.innerHTML = '@keyframes twinkle { 0%{opacity:0.2} 50%{opacity:1} 100%{opacity:0.2} }';
      document.head.appendChild(style);
      
      clearLog();
      addToLog('🌌 التجربة الكونية الكبرى جاهزة!');
    })();