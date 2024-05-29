import express from 'express';
import * as pathway_controller from '../controllers/pathwayController.mjs';
import * as sequence_controller from '../controllers/sequenceController.mjs';
import * as tarot_controller from '../controllers/tarotController.mjs';
import * as sefirah_controller from '../controllers/sefirahController.mjs';
import * as mainIngredient_controller from '../controllers/mainIngredientController.mjs';
import * as supplementaryIngredient_controller from '../controllers/supplementaryIngredientController.mjs';
import * as ability_controller from '../controllers/abilityController.mjs';
import upload from '../configs/multer.mjs';

const router = express.Router();

// Pathway route
// GET request

// GET inventory home page.
router.get('/', pathway_controller.page_index);

// GET request for creating a Pathway.
// NOTE: This must come before routes that displays the Pathway (use id).
router.get('/pathway/create', pathway_controller.pathway_create_get);

// GET request for list of all the Pathways.
router.get('/pathways', pathway_controller.pathway_list);

// GET request for a single Pathway.
router.get('/pathway/:id', pathway_controller.pathway_detail);

// GET request for updating a Pathway.
router.get('/pathway/:id/update', pathway_controller.pathway_update_get);

// GET request for deleting a Pathway.
router.get('/pathway/:id/delete', pathway_controller.pathway_delete_get);

// POST request
// POST request for creating a Pathway.
router.post('/pathway/create', upload.single('image'), pathway_controller.pathway_create_post);

// POST request for updating a Pathway.
router.post('/pathway/:id/update', upload.single('image'), pathway_controller.pathway_update_post);

// POST request for deleting a Pathway.
router.post('/pathway/:id/delete', pathway_controller.pathway_delete_post);

// SEQUENCE ROUTES
// GET request

// GET request for creating a Sequence.
// NOTE: This must come before routes that displays the Sequence (use id).
router.get('/sequence/create', sequence_controller.sequence_create_get);

// GET request for list of all Sequences.
router.get('/sequences', sequence_controller.sequence_list);

// GET request for a single Sequence.
router.get('/sequence/:id', sequence_controller.sequence_detail);

// GET request for updating a Sequence.
router.get('/sequence/:id/update', sequence_controller.sequence_update_get);

// GET request for deleting a Sequence.
router.get('/sequence/:id/delete', sequence_controller.sequence_delete_get);

// POST request
// POST request for creating a Sequence.
router.post('/sequence/create', upload.single('image'), sequence_controller.sequence_create_post);

// POST request for updating a Sequence.
router.post('/sequence/:id/update', upload.single('image'), sequence_controller.sequence_update_post);

// POST request for deleting a Sequence.
router.post('/sequence/:id/delete', sequence_controller.sequence_delete_post);

// SEFIRAH ROUTES
// GET request

// GET request for creating a Sefirah.
// NOTE: This must come before routes that displays the Sefirah (use id).
router.get('/sefirah/create', sefirah_controller.sefirah_create_get);

// GET request for list of all Sefirahs.
router.get('/sefirahs', sefirah_controller.sefirah_list);

// GET request for a single Sefirah.
router.get('/sefirah/:id', sefirah_controller.sefirah_detail);

// GET request for updating a Sefirah.
router.get('/sefirah/:id/update', sefirah_controller.sefirah_update_get);

// GET request for deleting a Sefirah.
router.get('/sefirah/:id/delete', sefirah_controller.sefirah_delete_get);

// POST request
// POST request for creating a Sefirah.
router.post('/sefirah/create', upload.single('image'), sefirah_controller.sefirah_create_post);

// POST request for updating a Sefirah.
router.post('/sefirah/:id/update', upload.single('image'), sefirah_controller.sefirah_update_post);

// POST request for deleting a Sefirah.
router.post('/sefirah/:id/delete', upload.single('image'), sefirah_controller.sefirah_delete_post);

// TAROT ROUTES
// GET request

// GET request for creating a single Tarot.
// NOTE: This must come before routes that displays the Tarot (use id).
router.get('/tarot/create', tarot_controller.tarot_create_get);

// GET request for list of all Tarots.
router.get('/tarots', tarot_controller.tarot_list);

// GET request for a single tarot.
router.get('/tarot/:id', tarot_controller.tarot_detail);

// GET request for updating a Tarot.
router.get('/tarot/:id/update', tarot_controller.tarot_update_get);

// GET request for deleting a Tarot.
router.get('/tarot/:id/delete', tarot_controller.tarot_delete_get);

// POST request
// POST request for creating a Tarot.
router.post('/tarot/create',upload.single('image'),tarot_controller.tarot_create_post);

// POST request for updating a Tarot.
router.post('/tarot/:id/update', upload.single('image'), tarot_controller.tarot_update_post);

// POST request for deleting a Tarot
router.post('/tarot/:id/delete', tarot_controller.tarot_delete_post);

// MAIN INGREDIENT ROUTES
// GET request

// GET request for creating a single MainIngredient.
// NOTE: This must come before routes that displays the MainIngredient (use id).
router.get(
    '/main_ingredient/create',
    mainIngredient_controller.mainIngredient_create_get
);

// GET request for list of all MainIngredient.
router.get('/main_ingredients', mainIngredient_controller.mainIngredient_list);

// GET request for a single MainIngredient.
router.get(
    '/main_ingredient/:id',
    mainIngredient_controller.mainIngredient_detail
);

// GET request for updating a MainIngredient.
router.get(
    '/main_ingredient/:id/update',
    mainIngredient_controller.mainIngredient_update_get
);

// GET request for deleting a MainIngredient.
router.get(
    '/main_ingredient/:id/delete',
    mainIngredient_controller.mainIngredient_delete_get
);

// POST request
// POST request for creating a MainIngredient.
router.post(
    '/main_ingredient/create',
    upload.single('image'),
    mainIngredient_controller.mainIngredient_create_post
);

// POST request for updating a MainIngredient.
router.post(
    '/main_ingredient/:id/update',
    upload.single('image'),
    mainIngredient_controller.mainIngredient_update_post
);

// POST request for deleting a MainIngredient.
router.post(
    '/main_ingredient/:id/delete',
    mainIngredient_controller.mainIngredient_delete_post
);

// SUPPLEMENTARY INGREDIENT ROUTES
// GET request

// GET request for creating a single SupplementaryIngredient.
// NOTE: This must come before routes that displays the SupplementaryIngredient (use id).
router.get(
    '/supplementary_ingredient/create',
    supplementaryIngredient_controller.supplementaryIngredient_create_get
);

// GET request for list of all SupplementaryIngredient.
router.get(
    '/supplementary_ingredients',
    supplementaryIngredient_controller.supplementaryIngredient_list
);

// GET request for a single SupplementaryIngredient.
router.get(
    '/supplementary_ingredient/:id',
    supplementaryIngredient_controller.supplementaryIngredient_detail
);

// GET request for updating a SupplementaryIngredient.
router.get(
    '/supplementary_ingredient/:id/update',
    supplementaryIngredient_controller.supplementaryIngredient_update_get
);

// GET request for deleting a SupplementaryIngredient.
router.get(
    '/supplementary_ingredient/:id/delete',
    supplementaryIngredient_controller.supplementaryIngredient_delete_get
);

// POST request
// POST request for creating a SupplementaryIngredient.
router.post(
    '/supplementary_ingredient/create',
    upload.single('image'),
    supplementaryIngredient_controller.supplementaryIngredient_create_post
);

// POST request for updating a SupplementaryIngredient.
router.post(
    '/supplementary_ingredient/:id/update',
    upload.single('image'),
    supplementaryIngredient_controller.supplementaryIngredient_update_post
);

// POST request for deleting a SupplementaryIngredient.
router.post(
    '/supplementary_ingredient/:id/delete',
    supplementaryIngredient_controller.supplementaryIngredient_delete_post
);

// ABILITY ROUTES
// GET request

// GET request for creating a single Ability.
// NOTE: This must come before routes that displays the Ability (use id).
router.get('/ability/create', ability_controller.ability_create_get);

// GET request for list of all Ability.
router.get('/abilities', ability_controller.ability_list);

// GET request for a single Ability
router.get('/ability/:id', ability_controller.ability_detail);

// GET request for updating a Ability
router.get('/ability/:id/update', ability_controller.ability_update_get);

// GET request for deleting a Ability
router.get('/ability/:id/delete', ability_controller.ability_delete_get);

// POST request
// POST request for creating a Ability.
router.post('/ability/create', ability_controller.ability_create_post);

// POST request for updating a Ability.
router.post('/ability/:id/update', ability_controller.ability_update_post);

// POST request for deleting a Ability.
router.post('/ability/:id/delete', ability_controller.ability_delete_post);

export default router;
