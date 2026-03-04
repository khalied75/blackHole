 (function() {
      // منع التمرير عند لمس العناصر
      document.body.addEventListener('touchmove', (e) => {
        if (e.target.classList.contains('random-item') || e.target.closest('.random-item')) {
          e.preventDefault();
        }
      }, { passive: false });

      // بيانات الأشياء
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

      // عناصر السلايدرات
      const bhSlider = document.getElementById('bhSlider');
      const nsSlider = document.getElementById('nsSlider');
      const whSlider = document.getElementById('whSlider');
      
      // دوال التحديث (نفس الشيء لكن مختصرة)
      function updateAll() {
        // Black hole
        let p = bhSlider.value / 100;
        document.getElementById('bhRedshift').innerText = 'z=' + (0.1 + p * 4.5).toFixed(2);
        document.getElementById('bhRedshiftBar').style.width = Math.min(100, ((0.1 + p * 4.5)/5)*100) + '%';
        document.getElementById('bhTime').innerText = (1.0 - p * 0.8).toFixed(2) + 'x';
        document.getElementById('bhDistortion').innerText = p < 0.3 ? 'خفيف' : p < 0.6 ? 'متوسط' : 'شديد';
        document.getElementById('bhDistanceLabel').innerText = bhSlider.value + '%';

        // Neutron
        p = nsSlider.value / 100;
        document.getElementById('nsRedshift').innerText = 'z=' + (0.15 + p * 2.2).toFixed(2);
        document.getElementById('nsRedshiftBar').style.width = ((0.15 + p * 2.2) / 3.5 * 100) + '%';
        document.getElementById('nsTime').innerText = (1.0 - p * 0.5).toFixed(2) + 'x';
        document.getElementById('nsDistortion').innerText = p < 0.3 ? 'خفيف' : p < 0.6 ? 'نبض' : 'التواء';
        document.getElementById('nsDistanceLabel').innerText = nsSlider.value + '%';

        // White hole
        p = whSlider.value / 100;
        document.getElementById('whRedshift').innerText = 'z=' + (-0.05 - p * 0.4).toFixed(2);
        document.getElementById('whRedshiftBar').style.width = (p * 100) + '%';
        document.getElementById('whTime').innerText = (1.0 + p * 0.8).toFixed(2) + 'x';
        document.getElementById('whDistortion').innerText = p < 0.3 ? 'طرد' : p < 0.6 ? 'انبعاج' : 'تمزق';
        document.getElementById('whDistanceLabel').innerText = whSlider.value + '%';
      }

      bhSlider.addEventListener('input', updateAll);
      bhSlider.addEventListener('touchmove', updateAll);
      nsSlider.addEventListener('input', updateAll);
      nsSlider.addEventListener('touchmove', updateAll);
      whSlider.addEventListener('input', updateAll);
      whSlider.addEventListener('touchmove', updateAll);
      updateAll();

      // نظام السجل
      window.addToLog = function(message, type = 'info') {
        const log = document.getElementById('eventLog');
        const entry = document.createElement('div');
        entry.className = type === 'important' ? 'text-yellow-300 font-bold' : 'text-gray-300';
        const now = new Date();
        const timeStr = now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        entry.innerHTML = `⏱️ ${timeStr} - ${message}`;
        log.appendChild(entry);
        log.scrollTop = log.scrollHeight;
        while (log.children.length > 8) log.removeChild(log.children[0]);
      };

      window.clearLog = function() {
        document.getElementById('eventLog').innerHTML = '<div class="text-gray-500">✨ تم مسح السجل...</div>';
      };

      // دالة الرمي مع دعم اللمس
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
        
        // نظام السحب المتكامل (يدعم الماوس واللمس)
        let isDragging = false;
        let startX, startY, startLeft, startTop;
        let currentPointerId = null;
        
        const startDrag = (clientX, clientY) => {
          isDragging = true;
          item.classList.add('touch-dragging');
          const rect = item.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          
          startX = clientX;
          startY = clientY;
          startLeft = (rect.left - containerRect.left) / containerRect.width * 100;
          startTop = (rect.top - containerRect.top) / containerRect.height * 100;
          
          item.style.transition = 'none';
          document.body.style.overflow = 'hidden';
        };
        
        const moveDrag = (clientX, clientY) => {
          if (!isDragging) return;
          
          const containerRect = container.getBoundingClientRect();
          const deltaX = clientX - startX;
          const deltaY = clientY - startY;
          
          let newLeft = startLeft + (deltaX / containerRect.width * 100);
          let newTop = startTop + (deltaY / containerRect.height * 100);
          
          newLeft = Math.max(0, Math.min(100, newLeft));
          newTop = Math.max(0, Math.min(100, newTop));
          
          item.style.left = newLeft + '%';
          item.style.top = newTop + '%';
        };
        
        const endDrag = () => {
          if (!isDragging) return;
          isDragging = false;
          item.classList.remove('touch-dragging');
          item.style.transition = 'all 0.3s';
          document.body.style.overflow = '';
          currentPointerId = null;
          
          // التحقق من الدخول للثقب
          const containerRect = container.getBoundingClientRect();
          const itemRect = item.getBoundingClientRect();
          const centerX = containerRect.left + containerRect.width/2;
          const centerY = containerRect.top + containerRect.height/2;
          const itemCenterX = itemRect.left + itemRect.width/2;
          const itemCenterY = itemRect.top + itemRect.height/2;
          const distance = Math.hypot(itemCenterX - centerX, itemCenterY - centerY);
          
          if (distance < 80) {
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
        
        // أحداث الماوس
        item.addEventListener('mousedown', (e) => {
          e.preventDefault();
          startDrag(e.clientX, e.clientY);
        });
        
        // أحداث اللمس
        item.addEventListener('touchstart', (e) => {
          e.preventDefault();
          const touch = e.touches[0];
          currentPointerId = touch.identifier;
          startDrag(touch.clientX, touch.clientY);
        }, { passive: false });
        
        // حركة الماوس
        document.addEventListener('mousemove', (e) => {
          moveDrag(e.clientX, e.clientY);
        });
        
        document.addEventListener('mouseup', endDrag);
        
        // حركة اللمس
        document.addEventListener('touchmove', (e) => {
          if (!isDragging) return;
          e.preventDefault();
          for (let i = 0; i < e.touches.length; i++) {
            if (e.touches[i].identifier === currentPointerId) {
              moveDrag(e.touches[i].clientX, e.touches[i].clientY);
              break;
            }
          }
        }, { passive: false });
        
        document.addEventListener('touchend', (e) => {
          if (!isDragging) return;
          endDrag();
        });
        
        document.addEventListener('touchcancel', endDrag);
        
        // حذف تلقائي
        setTimeout(() => {
          if (item.parentNode) {
            item.remove();
            addToLog(`⌛ ${finalItem.name} ضاع في الفضاء...`);
          }
        }, 20000);
      };

      // نجوم الخلفية
      for (let i = 0; i < 50; i++) {
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
      
      clearLog();
      addToLog('🌌 مرحباً في الكون! اسحب الأشياء بإصبعك');
    })();