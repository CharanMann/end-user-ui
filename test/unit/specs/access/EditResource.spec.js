import Vue from 'vue';
import EditResource from '@/components/access/EditResource';
import VueI18n from 'vue-i18n';
import BootstrapVue from 'bootstrap-vue';
import translations from '@/translations';
import { shallow } from '@vue/test-utils';
import Sinon from 'sinon';

describe('EditResource.vue', () => {
    var sandbox = null;

    Vue.use(VueI18n);
    Vue.use(BootstrapVue);

    const i18n = new VueI18n({
            locale: 'en',
            messages: translations
        }),
        $route = {
            path: '/test',
            meta: {},
            params: {
                resourceName: 'test',
                resourceType: 'test',
                resourceId: 'test'
            }
        };

    beforeEach(function () {
        sandbox = Sinon.sandbox.create();

        sandbox.stub(EditResource, 'mounted').callsFake(function () {});
    });

    afterEach(function () {
        sandbox.restore();
    });

    it('EditResource page loaded', () => {
        const wrapper = shallow(EditResource, {
            i18n,
            stubs: {
                'router-link': true
            },
            mocks: {
                $route
            }
        });

        expect(wrapper.name()).to.equal('Edit-Resource');
    });

    it('Format display data', () => {
        const wrapper = shallow(EditResource, {
            i18n,
            stubs: {
                'router-link': true
            },
            mocks: {
                $route
            }
        });

        let schema = {
                icon: 'fa-test',
                order: ['userName', 'sn', 'email', 'contractor'],
                required: ['userName'],
                properties: {
                    userName: {
                        type: 'string',
                        title: 'Username'
                    },
                    sn: {
                        type: 'string',
                        title: 'Last Name'
                    },
                    email: {
                        type: 'string',
                        title: 'Email'
                    },
                    contractor: {
                        type: 'boolean',
                        title: 'Contractor'
                    }
                }
            },
            privilege = {
                UPDATE: [{
                    attribute: 'userName',
                    readOnly: false
                },
                {
                    attribute: 'contractor',
                    readOnly: false
                },
                {
                    attribute: 'sn',
                    readOnly: true
                },
                {
                    attribute: 'email',
                    readOnly: false
                }],
                DELETE: [{
                    attribute: 'userName',
                    readOnly: false
                }]
            },
            resourceDetails = {
                userName: 'test',
                email: 'test@test.com'
            };

        wrapper.vm.generateDisplay(schema, privilege, resourceDetails);

        expect(wrapper.vm.icon).to.equal('fa-test');
        expect(wrapper.vm.formFields['contractor']).to.equal(false);
    });

    it('Password reveal correctly', () => {
        const wrapper = shallow(EditResource, {
            i18n,
            stubs: {
                'router-link': true
            },
            mocks: {
                $route
            }
        });

        expect(wrapper.vm.passwordInputType).to.equal('password');

        wrapper.vm.revealNew();

        expect(wrapper.vm.passwordInputType).to.equal('text');

        wrapper.vm.revealNew();

        expect(wrapper.vm.passwordInputType).to.equal('password');
    });
});
