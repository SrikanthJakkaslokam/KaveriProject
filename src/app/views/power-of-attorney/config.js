// In real applications, you should not transpile code in the browser. You can see how to create your own application with Angular and DevExtreme here:
// https://js.devexpress.com/Documentation/Guide/Angular_Components/Getting_Started/Create_a_DevExtreme_Application/
window.config = {
    transpiler: 'ts',
    typescriptOptions: {
        module: "system",
        emitDecoratorMetadata: true,
        experimentalDecorators: true
    },
    meta: {
        'typescript': {
            "exports": "ts"
        },
        'devextreme/localization.js': {
            "esModule": true
        }
    },
    paths: {
        'npm:': 'https://unpkg.com/'
    },
    map: {
        'ts': 'npm:plugin-typescript@8.0.0/lib/plugin.js',
        'typescript': 'npm:typescript@3.5.3/lib/typescript.js',
        '@angular': 'npm:@angular',
        'tslib': 'npm:tslib@2.2.0/tslib.js',
        'rxjs': 'npm:rxjs@6.4.0',
        'rrule': 'npm:rrule@2.6.6/dist/es5/rrule.js',
        'luxon': 'npm:luxon@1.27.0/build/global/luxon.min.js',
        'es6-object-assign': 'npm:es6-object-assign@1.1.0',
        'devextreme': 'npm:devextreme@21.1.3/cjs',
        'devextreme/bundles/dx.all': 'npm:devextreme@21.1.3/bundles/dx.all.js',
        'jszip': 'npm:jszip@3.6.0/dist/jszip.min.js',
        'devextreme-quill': 'npm:devextreme-quill@1.0.0/dist/dx-quill.min.js',
        'devexpress-diagram': 'npm:devexpress-diagram@2.1.15',
        'devexpress-gantt': 'npm:devexpress-gantt@2.1.31',
        'devextreme-angular': 'npm:devextreme-angular@21.1.3',
        '@devextreme/vdom': 'npm:@devextreme/vdom@1.2.1',
        'inferno': 'npm:inferno@7.4.8/dist/inferno.min.js',
        'inferno-compat': 'npm:inferno-compat@7.4.8/dist/inferno-compat.min.js',
        'inferno-create-element': 'npm:inferno-create-element@7.4.8/dist/inferno-create-element.min.js',
        'inferno-dom': 'npm:inferno-dom@1.0.7/dist/inferno-dom.min.js',
        'inferno-hydrate': 'npm:inferno-hydrate@7.4.8/dist/inferno-hydrate.min.js',
        'inferno-clone-vnode': 'npm:inferno-clone-vnode@7.4.8/dist/inferno-clone-vnode.min.js',
        'inferno-create-class': 'npm:inferno-create-class@7.4.8/dist/inferno-create-class.min.js',
        'inferno-extras': 'npm:inferno-extras@7.4.8/dist/inferno-extras.min.js'
    },
    packages: {
        'app': {
            main: './app.component.ts',
            defaultExtension: 'ts'
        },
        'devextreme': {
            defaultExtension: 'js'
        },
        '@devextreme/vdom': {
            defaultExtension: 'js'
        },
        'devextreme/events/utils': {
            main: 'index'
        },
        'devextreme/events': {
            main: 'index'
        },
        'es6-object-assign': {
            main: './index.js',
            defaultExtension: 'js'
        }
    },
    packageConfigPaths: [
        "npm:@devextreme/*/package.json",
        "npm:@angular/*/package.json",
        "npm:@angular/common/*/package.json",
        "npm:rxjs/package.json",
        "npm:rxjs/operators/package.json",
        "npm:devextreme-angular/*/package.json",
        "npm:devextreme-angular/ui/*/package.json",
        "npm:devextreme-angular/package.json",
        "npm:devexpress-diagram/package.json",
        "npm:devexpress-gantt/package.json",
    ]
};
System.config(window.config);
