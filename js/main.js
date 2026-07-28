(function () {
    'use strict';

    const PAGES = {
        index: 'index.html',
        login: 'login.html',
        registro: 'registro.html',
        reportes: 'reportes.html',
        crearReporte: 'crear-reporte.html'
    };

    function setActiveNav() {
        const current = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.navbar__item').forEach(function (item) {
            const href = item.getAttribute('href');
            if (href === current) {
                item.classList.add('navbar__item--active');
                item.setAttribute('aria-current', 'page');
            } else {
                item.classList.remove('navbar__item--active');
                item.removeAttribute('aria-current');
            }
        });
    }

    function showError(input, errorEl, message) {
        input.classList.add('form__input--error');
        input.setAttribute('aria-invalid', 'true');
        if (errorEl) {
            errorEl.textContent = message;
        }
    }

    function clearError(input, errorEl) {
        input.classList.remove('form__input--error');
        input.removeAttribute('aria-invalid');
        if (errorEl) {
            errorEl.textContent = '';
        }
    }

    function validateField(input, errorEl, validator) {
        const value = input.value.trim();
        const result = validator(value);
        if (!result.valid) {
            showError(input, errorEl, result.message);
            return false;
        }
        clearError(input, errorEl);
        return true;
    }

    function setupLoginForm() {
        const form = document.getElementById('loginForm');
        if (!form) return;

        const userInput = document.getElementById('login-user');
        const passInput = document.getElementById('login-pass');
        const userError = document.getElementById('login-user-error');
        const passError = document.getElementById('login-pass-error');

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            let isValid = true;

            isValid = validateField(userInput, userError, function (value) {
                if (value.length < 3) return { valid: false, message: 'Ingresá tu usuario' };
                return { valid: true };
            }) && isValid;

            isValid = validateField(passInput, passError, function (value) {
                if (value.length < 6) return { valid: false, message: 'La contraseña debe tener al menos 6 caracteres' };
                return { valid: true };
            }) && isValid;

            if (isValid) {
                showFormSuccess(form, 'Ingresando...');
                setTimeout(function () {
                    window.location.href = PAGES.reportes;
                }, 800);
            }
        });

        userInput.addEventListener('input', function () {
            clearError(userInput, userError);
        });
        passInput.addEventListener('input', function () {
            clearError(passInput, passError);
        });
    }

    function setupRegisterForm() {
        const form = document.getElementById('registerForm');
        if (!form) return;

        const nameInput = document.getElementById('reg-name');
        const userInput = document.getElementById('reg-user');
        const emailInput = document.getElementById('reg-email');
        const passInput = document.getElementById('reg-pass');
        const passConfirmInput = document.getElementById('reg-pass-confirm');

        const nameError = document.getElementById('reg-name-error');
        const userError = document.getElementById('reg-user-error');
        const emailError = document.getElementById('reg-email-error');
        const passError = document.getElementById('reg-pass-error');
        const passConfirmError = document.getElementById('reg-pass-confirm-error');

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            let isValid = true;

            isValid = validateField(nameInput, nameError, function (value) {
                if (value.trim().length < 3) return { valid: false, message: 'Ingresá tu nombre completo' };
                return { valid: true };
            }) && isValid;

            isValid = validateField(userInput, userError, function (value) {
                if (value.trim().length < 3) return { valid: false, message: 'El usuario debe tener al menos 3 caracteres' };
                return { valid: true };
            }) && isValid;

            isValid = validateField(emailInput, emailError, function (value) {
                var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) return { valid: false, message: 'Ingresá un correo electrónico válido' };
                return { valid: true };
            }) && isValid;

            isValid = validateField(passInput, passError, function (value) {
                if (value.length < 6) return { valid: false, message: 'La contraseña debe tener al menos 6 caracteres' };
                return { valid: true };
            }) && isValid;

            isValid = validateField(passConfirmInput, passConfirmError, function (value) {
                if (value !== passInput.value || value === '') return { valid: false, message: 'Las contraseñas no coinciden' };
                return { valid: true };
            }) && isValid;

            if (isValid) {
                showFormSuccess(form, 'Cuenta creada correctamente. Redirigiendo al login...');
                setTimeout(function () {
                    window.location.href = PAGES.login;
                }, 1200);
            }
        });

        var inputs = [nameInput, userInput, emailInput, passInput, passConfirmInput];
        var errors = [nameError, userError, emailError, passError, passConfirmError];
        inputs.forEach(function (input, index) {
            input.addEventListener('input', function () {
                clearError(input, errors[index]);
            });
        });
    }

    function setupCreateReportForm() {
        const form = document.getElementById('createReportForm');
        if (!form) return;

        const titleInput = document.getElementById('report-title');
        const categoryInput = document.getElementById('report-category');
        const descriptionInput = document.getElementById('report-description');
        const photoInput = document.getElementById('report-photo');
        const mapInput = document.getElementById('report-map');

        const titleError = document.getElementById('report-title-error');
        const categoryError = document.getElementById('report-category-error');
        const descriptionError = document.getElementById('report-description-error');
        const photoError = document.getElementById('report-photo-error');
        const mapError = document.getElementById('report-map-error');

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            let isValid = true;

            isValid = validateField(titleInput, titleError, function (value) {
                if (value.trim().length < 5) return { valid: false, message: 'El título debe tener al menos 5 caracteres' };
                return { valid: true };
            }) && isValid;

            isValid = validateField(categoryInput, categoryError, function (value) {
                if (!value) return { valid: false, message: 'Seleccioná una categoría' };
                return { valid: true };
            }) && isValid;

            isValid = validateField(descriptionInput, descriptionError, function (value) {
                if (value.trim().length < 10) return { valid: false, message: 'La descripción debe tener al menos 10 caracteres' };
                return { valid: true };
            }) && isValid;

            if (photoInput && photoInput.disabled) {
                if (photoError) photoError.textContent = 'La funcionalidad de foto no está disponible en este prototipo';
            } else if (photoError) {
                photoError.textContent = '';
            }

            if (mapInput && mapInput.disabled) {
                if (mapError) mapError.textContent = 'La funcionalidad de mapa no está disponible en este prototipo';
            } else if (mapError) {
                mapError.textContent = '';
            }

            if (isValid) {
                showFormSuccess(form, 'Reporte enviado correctamente. Redirigiendo...');
                setTimeout(function () {
                    window.location.href = PAGES.reportes;
                }, 1200);
            }
        });

        var inputs = [titleInput, categoryInput, descriptionInput];
        var errors = [titleError, categoryError, descriptionError];
        inputs.forEach(function (input, index) {
            if (!input) return;
            input.addEventListener('change', function () {
                clearError(input, errors[index]);
            });
            input.addEventListener('input', function () {
                clearError(input, errors[index]);
            });
        });
    }

    function showFormSuccess(form, message) {
        var btn = form.querySelector('.btn--primary');
        if (btn) {
            var originalText = btn.textContent;
            btn.textContent = message;
            btn.disabled = true;
            setTimeout(function () {
                btn.textContent = originalText;
                btn.disabled = false;
            }, 1500);
        }
    }

    function init() {
        setActiveNav();
        setupLoginForm();
        setupRegisterForm();
        setupCreateReportForm();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
