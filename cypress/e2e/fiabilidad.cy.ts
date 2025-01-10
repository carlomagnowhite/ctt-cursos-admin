describe('Prueba de fiabilidad: Log in, navegación y log out repetitivo', () => {
  const email = 'mateo19dg@gmail.com'; // Cambia por tu correo válido
  const password = 'maradona2013'; // Cambia por tu contraseña válida
  const iteraciones = 50; // Define cuántas veces quieres repetir el flujo

  it('Debería loguearse, navegar entre módulos y cerrar sesión varias veces', () => {
    for (let i = 0; i < iteraciones; i++) {
      cy.log(`Iteración número: ${i + 1}`);

      // Paso 1: Visitar la página de inicio de sesión
      cy.visit('https://ctt-cursos-admin-production.up.railway.app');

      // Paso 2: Esperar a que el formulario esté visible
      cy.get('form.p-6').should('be.visible');

      // Paso 3: Completar el formulario de inicio de sesión
      cy.get('form.p-6')
        .find('input[formControlName="email"]')
        .filter(':visible')
        .first()
        .type(email, { force: true });
      cy.get('form.p-6')
        .find('input[formControlName="password"]')
        .filter(':visible')
        .first()
        .type(password, { force: true });

      // Paso 4: Verificar que el botón no está deshabilitado
      cy.get('form.p-6')
        .find('button[type="submit"]')
        .filter(':visible')
        .should('have.length', 1) // Asegúrate de que solo hay un botón visible
        .and('not.be.disabled')
        .click({ force: true });

      // Paso 5: Verificar que redirige al dashboard
      cy.url({ timeout: 10000 }).should('include', '/dashboard');

      // Paso 4: Cerrar sesión
      cy.get('section.w-full')
        .find('button')
        .filter(':visible')
        .should('contain.text', 'Cerrar sesión')
        .and('not.be.disabled')
        .click({ force: true });

      // Paso 8: Verificar que vuelve a la pantalla de inicio de sesión
      cy.url().should('not.include', '/dashboard');
    }
  });
});
