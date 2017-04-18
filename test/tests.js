var should = require('should');
var assert = require('assert');
var request = require('supertest');
var Contact = require('../model/contact.model');
var url = 'http://localhost:3000';

describe('Routing', function () {

    describe('Contacts', function () {
        before((done) =>  {
            Contact.remove({}).then(() => done())
        });
        it('should create first contact', function (done) {
            var body = {
                firstName: 'Kate',
                lastName: 'Karanets',
                contactNumber: '+375291240494'
            };
            request(url)
                .post('/api/contact/')
                .type('json')
                .send(body)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.contact.should.have.property('_id');
                    res.body.contact.firstName.should.equal('Kate');
                    res.body.contact.lastName.should.equal('Karanets');
                    res.body.contact.contactNumber.should.equal('+375291240494');
                    done();
                });
        });
        it('should create second contact', function (done) {
            var body = {
                firstName: 'Eric',
                lastName: 'Cartman',
                contactNumber: '+375294565857'
            };
            request(url)
                .post('/api/contact/')
                .type('json')
                .send(body)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.contact.should.have.property('_id');
                    res.body.contact.firstName.should.equal('Eric');
                    res.body.contact.lastName.should.equal('Cartman');
                    res.body.contact.contactNumber.should.equal('+375294565857');
                    done();
                });
        });
        it('should create third contact', function (done) {
            var body = {
                firstName: 'Elvis',
                lastName: 'Presley',
                contactNumber: '+375294965857'
            };
            request(url)
                .post('/api/contact/')
                .type('json')
                .send(body)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.contact.should.have.property('_id');
                    res.body.contact.firstName.should.equal('Elvis');
                    res.body.contact.lastName.should.equal('Presley');
                    res.body.contact.contactNumber.should.equal('+375294965857');
                    done();
                });
        });
        it('should update contact', function (done) {
            let rand = Math.random();
            var body = {
                firstName: 'EricC' + rand,
                lastName: 'Brodeman'
            };
            request(url)
                .get('/api/contact')
                .end(function (err, res) {
                    request(url)
                        .put('/api/contact/' + res.body.contacts[1]._id)
                        .type('json')
                        .send(body)
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .end(function (err, res) {
                            if (err) {
                                throw err;
                            }
                            res.body.contact.should.have.property('_id');
                            res.body.contact.firstName.should.equal('EricC' + rand);
                            res.body.contact.lastName.should.equal('Brodeman');
                            done();
                        });
                })
        });
        it('expect 404 on delete random contact', function (done) {
            request(url)
                .delete('/api/contact/58f20ed32fcaed3154e13262')
                .type('json')
                .expect(404)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    done();
                });
        });
        it('expect deleting first contact', function (done) {
            request(url)
                .get('/api/contact')
                .end(function (err, res) {
                    request(url)
                        .delete('/api/contact/' + res.body.contacts[0]._id)
                        .type('json')
                        .expect(200)
                        .end(function (err, res) {
                            if (err) {
                                throw err;
                            }
                            res.body.result.should.equal('deleted');
                            done();
                        });
                })
        });
        it('expect find call history', function (done) {
            request(url)
                .get('/api/contact/')
                .end(function (err, res) {
                    request(url)
                        .get('/api/contact/' + res.body.contacts[1]._id + '/history')
                        .type('json')
                        .expect(200)
                        .end(function (err, res) {
                            if (err) {
                                throw err;
                            }
                            res.body.callHistory.should.have.length(2);
                            done();
                        });
                })
        });

    });
});