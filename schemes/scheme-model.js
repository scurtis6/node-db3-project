const db = require('../data/db-config');

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove,
    addStep
}
// find():
// Calling find returns a promise that resolves to an array of all schemes in the database.
// No steps are included.
function find() {
    return db('schemes')
}

// findById(id):
// Expects a scheme id as its only parameter.
// Resolve to a single scheme object.
// On an invalid id, resolves to null.
function findById(id) {
    return db('schemes')
    .where('id', id)
}

// findSteps(id):
// Expects a scheme id.
// Resolves to an array of all correctly ordered step for the given scheme: [ { id: 17, scheme_name: 'Find the Holy Grail', step_number: 1, instructions: 'quest'}, { id: 18, scheme_name: 'Find the Holy Grail', step_number: 2, instructions: '...and quest'}, etc. ].
// This array should include the scheme_name not the scheme_id.
function findSteps(id) {
    return db('schemes as sc')
    .join('steps as st', 'sc.id', 'st.scheme_id')
    .select('st.id', 'sc.scheme_name', 'st.step_number', 'st.instructions')
    .where('sc.id', id)
    .orderBy('st.step_number')
}

// add(scheme):
// Expects a scheme object.
// Inserts scheme into the database.
// Resolves to the newly inserted scheme, including id.

function add(scheme) {
    return db('schemes')
    .insert(scheme, 'id')
}

// Stretch Problem
// addStep(step, scheme_id): This method expects a step object and a scheme id. It inserts the new step into the database, correctly linking it to the intended scheme.
// You may use POST /api/schemes/:id/addStep to test this method.

function addStep(step, scheme_id) {
    newStep = {...step, scheme_id}
    return db('steps')
    .insert(newStep)
}

// update(changes, id):
// Expects a changes object and an id.
// Updates the scheme with the given id.
// Resolves to the newly updated scheme object.

function update(changes, id) {
    return db('schemes')
    .where('schemes.id', id)
    .update(changes)
}

// remove(id):
// Removes the scheme object with the provided id.
// Resolves to the removed scheme
// Resolves to null on an invalid id.
// (Hint: Only worry about removing the scheme. The database is configured to automatically remove all associated steps.)

function remove(id) {
    return db('schemes')
    .where('id', id)
    .del()
}
