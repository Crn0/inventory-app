#! /usr/bin/env node
import 'dotenv/config';
import mongoose from 'mongoose';
import UploadImage from '../configs/cloudinary.mjs';
import LOTM from './lotmdb.mjs';
import Pathway from '../models/pathway.mjs';
import Sefirah from '../models/sefirah.mjs';
import Tarot from '../models/tarot.mjs';
import Sequence from '../models/sequence.mjs';
import MainIngredient from '../models/mainIngredient.mjs';
import SupplementaryIngredient from '../models/supplementaryIngredient.mjs';
import Ability from '../models/ability.mjs';
import {
    PathwayFactory,
    SequenceFactory,
    SefirahFactory,
    TarotFactory,
    AbilityFactory,
    MainIngredientFactory,
    SupplementaryIngredientFactory,
} from '../helpers/dataFactory.mjs';

console.log(
    `This script populates some test pathways, sefirahs, tarots, sequences, main ingredients, supplementary ingredients and abilities to your database. Specified database as argument - e.g.: node populatedb ${process.env.MONGO_DB}`
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const pathwayFactory = PathwayFactory('Pathway');
const sefirahFactory = SefirahFactory('Sefirah');
const tarotFactory = TarotFactory('Tarot');
const sequenceFactory = SequenceFactory('Sequence');
const abilityFactory = AbilityFactory('Ability');
const mainIngredientFactory = MainIngredientFactory('Main Ingredient');
const supplementaryIngredientFactory = SupplementaryIngredientFactory(
    'Supplementary Ingredient'
);

mongoose.set('strictQuery', false);

const mongoDB = process.env.MONGO_DB || userArgs[0];

const main = async () => {
    console.log('Debug: About to connect');
    await mongoose.connect(mongoDB);
    console.log('Debug: Should be connected?');
    // Image creator
    await CreateImagePathway();
    await CreateImagesSefirah();
    await CreateImageTarot();
    await CreateImageSequence();
    await CreateImageMainIng();
    await CreateImageSuppIng();
    // Model creator
    await CreateTarots();
    await CreateSefirahs();
    await CreatePathways();
    await CreateMainIng();
    await CreateSuppIng();
    await CreateAbility();
    await CreateSequence();
    console.log('Debug: Closing mongoose');
    mongoose.connection.close();
};

main();

async function ImageCreate(index, url, tags, cb) {
    try {
        const image = await UploadImage(url, tags);
        // inject image factory to set the image url and id
        cb.setImage(index, image.url, image.public_id);
    } catch (error) {
        console.error(error);
    }
}

async function PathwayCreate(
    index,
    name,
    url,
    cloudinary_id,
    card_of_blasphemy,
    mythical_form,
    sefirah,
    above_the_sequence
) {
    const pathwayDetail = {
        name,
        card_of_blasphemy,
        mythical_form,
        sefirah,
        above_the_sequence,
    };

    if (url && cloudinary_id) {
        pathwayDetail.image = {
            url,
            cloudinary_id,
        };
    }

    const pathway = new Pathway(pathwayDetail);

    await pathway.save();

    pathwayFactory.setPath(index, pathway);

    console.log(`Added pathway: ${name}`);
}

async function SequenceCreate(
    index,
    name,
    url,
    cloudinary_id,
    main_ingredients,
    supplementary_ingredients,
    abilities,
    path
) {
    const sequenceDetail = {
        name,
        abilities,
        path,
        formula: {
            main_ingredients,
            supplementary_ingredients,
        },
    };

    if (url && cloudinary_id) {
        sequenceDetail.image = {
            url,
            cloudinary_id,
        };
    }

    const sequence = new Sequence(sequenceDetail);

    await sequence.save();

    sequenceFactory.setSequence(index, sequence);

    console.log(`Added sequence: sequence ${name} - path ${path}`);
}

async function SefirahCreate(
    index,
    name,
    url,
    cloudinary_id,
    possessor,
    description
) {
    const sefirahDetails = {
        name,
        possessor,
        description,
    };

    if (url && cloudinary_id) {
        sefirahDetails.image = {
            url,
            cloudinary_id,
        };
    }

    const sefirah = new Sefirah(sefirahDetails);
    await sefirah.save();
    sefirahFactory.setSefirah(index, sefirah);

    console.log(`Added sefirah: ${name}`);
}

async function TarotCreate(index, name, url, cloudinary_id) {
    const tarotDetails = {
        name,
    };

    if (url && cloudinary_id) {
        tarotDetails.image = {
            url,
            cloudinary_id,
        };
    }

    const tarot = new Tarot(tarotDetails);

    await tarot.save();

    tarotFactory.setTarot(index, tarot);

    console.log(`Added tarot: ${name}`);
}

async function AbilityCreate(index, name, description) {
    const abilityDetails = {
        name,
        description,
    };

    const ability = new Ability(abilityDetails);

    await ability.save();

    abilityFactory.setAbility(index, ability);

    console.log(`Added ability: ${name}`);
}

async function MainIngredientCreate(
    index,
    name,
    url,
    cloudinary_id,
    description,
    stocks
) {
    const mainIngredientDetails = {
        name,
        description,
        stocks,
    };

    if (url && cloudinary_id) {
        mainIngredientDetails.image = {
            url,
            cloudinary_id,
        };
    }

    const mainIngredient = new MainIngredient(mainIngredientDetails);

    await mainIngredient.save();

    mainIngredientFactory.setIngredient(index, mainIngredient);

    console.log(`Added main ingredient: ${name}`);
}

async function SupplementaryIngredientCreate(
    index,
    name,
    url,
    cloudinary_id,
    description,
    stocks
) {
    const supplementaryIngredientDetails = {
        name,
        description,
        stocks,
    };

    if (url && cloudinary_id) {
        supplementaryIngredientDetails.image = {
            url,
            cloudinary_id,
        };
    }

    const supplementaryIngredient = new SupplementaryIngredient(
        supplementaryIngredientDetails
    );

    await supplementaryIngredient.save();

    supplementaryIngredientFactory.setIngredient(
        index,
        supplementaryIngredient
    );

    console.log(`Added main ingredient: ${name}`);
}

// Image creator
async function CreateImagePathway() {
    console.log('Adding Pathway Images');
    await Promise.all([
        ImageCreate(
            0,
            LOTM.pathways.the_fool.url,
            LOTM.pathways.the_fool.tag,
            pathwayFactory
        ),
        ImageCreate(
            1,
            LOTM.pathways.red_priest.url,
            LOTM.pathways.red_priest.tag,
            pathwayFactory
        ),
        ImageCreate(
            2,
            LOTM.pathways.visionary.url,
            LOTM.pathways.visionary.tag,
            pathwayFactory
        ),
    ]);
}

async function CreateImagesSefirah() {
    console.log('Adding Sefirah Images');
    await Promise.all([
        ImageCreate(
            0,
            LOTM.sefirahs.sefirah_castle.url,
            LOTM.sefirahs.sefirah_castle.tag,
            sefirahFactory
        ),
        ImageCreate(
            1,
            LOTM.sefirahs.city_of_calamity.url,
            LOTM.sefirahs.city_of_calamity.tag,
            sefirahFactory
        ),
        ImageCreate(
            2,
            LOTM.sefirahs.chaos_sea.url,
            LOTM.sefirahs.chaos_sea.tag,
            sefirahFactory
        ),
    ]);
}

async function CreateImageTarot() {
    console.log('Adding Tarot Images');
    await Promise.all([
        ImageCreate(
            0,
            LOTM.tarots.the_fool_card.url,
            LOTM.tarots.the_fool_card.tag,
            tarotFactory
        ),
        ImageCreate(
            1,
            LOTM.tarots.the_chariot.url,
            LOTM.tarots.the_chariot.tag,
            tarotFactory
        ),
        ImageCreate(
            2,
            LOTM.tarots.justice_card.url,
            LOTM.tarots.justice_card.tag,
            tarotFactory
        ),
    ]);
}

async function CreateImageSequence() {
    console.log('Adding Sequence Images');
    await Promise.all([
        ImageCreate(
            0,
            LOTM.sequence.the_fool.seer.url,
            LOTM.sequence.the_fool.seer.tag,
            sequenceFactory
        ),
        ImageCreate(
            1,
            LOTM.sequence.red_priest.hunter.url,
            LOTM.sequence.red_priest.hunter.tag,
            sequenceFactory
        ),
        ImageCreate(
            2,
            LOTM.sequence.visionary.spectator.url,
            LOTM.sequence.visionary.spectator.tag,
            sequenceFactory
        ),
    ]);
}

async function CreateImageMainIng() {
    console.log('Adding Main Ingredient Images');
    await Promise.all([
        ImageCreate(
            0,
            LOTM.main_ing.seer_beyonder_chara.url,
            LOTM.main_ing.seer_beyonder_chara.tag,
            mainIngredientFactory
        ),
        ImageCreate(
            1,
            LOTM.main_ing.hunter_beyonder_chara.url,
            LOTM.main_ing.hunter_beyonder_chara.tag,
            mainIngredientFactory
        ),
        ImageCreate(
            2,
            LOTM.main_ing.spectator_beyonder_chara.url,
            LOTM.main_ing.spectator_beyonder_chara.tag,
            mainIngredientFactory
        ),
        // Seer ingredients
        ImageCreate(
            3,
            LOTM.main_ing.lavos_squid_blood.url,
            LOTM.main_ing.lavos_squid_blood.tag,
            mainIngredientFactory
        ),
        ImageCreate(
            4,
            LOTM.main_ing.stellar_aqua_crystal.url,
            LOTM.main_ing.stellar_aqua_crystal.tag,
            mainIngredientFactory
        ),
        // Spectator ingredients
        ImageCreate(
            5,
            LOTM.main_ing.manhal_fish_eyeballs.url,
            LOTM.main_ing.manhal_fish_eyeballs.tag,
            mainIngredientFactory
        ),
        ImageCreate(
            6,
            LOTM.main_ing.goat_horned_blackfish_blood.url,
            LOTM.main_ing.goat_horned_blackfish_blood.tag,
            mainIngredientFactory
        ),
    ]);
}

async function CreateImageSuppIng() {
    console.log('Adding Supplementary Ingredient Images');
    await Promise.all([
        // Seer and Spectator ing
        ImageCreate(
            0,
            LOTM.supplementary_ing.pure_water.url,
            LOTM.supplementary_ing.pure_water.tag,
            supplementaryIngredientFactory
        ),
        // Seer ing
        ImageCreate(
            1,
            LOTM.supplementary_ing.night_vanilla_liquid.url,
            LOTM.supplementary_ing.night_vanilla_liquid.tag,
            supplementaryIngredientFactory
        ),
        ImageCreate(
            2,
            LOTM.supplementary_ing.gold_mint_leaves.url,
            LOTM.supplementary_ing.gold_mint_leaves.tag,
            supplementaryIngredientFactory
        ),
        ImageCreate(
            3,
            LOTM.supplementary_ing.poison_hemlock.url,
            LOTM.supplementary_ing.poison_hemlock.tag,
            supplementaryIngredientFactory
        ),
        ImageCreate(
            4,
            LOTM.supplementary_ing.dragon_blood_grass_powder.url,
            LOTM.supplementary_ing.dragon_blood_grass_powder.tag,
            supplementaryIngredientFactory
        ),
        // Hunter ing
        ImageCreate(
            5,
            LOTM.supplementary_ing.red_wine.url,
            LOTM.supplementary_ing.red_wine.tag,
            supplementaryIngredientFactory
        ),
        ImageCreate(
            6,
            LOTM.supplementary_ing.red_chestnut_flower.url,
            LOTM.supplementary_ing.red_chestnut_flower.tag,
            supplementaryIngredientFactory
        ),
        ImageCreate(
            7,
            LOTM.supplementary_ing.poplar_tree_leaf_powder.url,
            LOTM.supplementary_ing.poplar_tree_leaf_powder.tag,
            supplementaryIngredientFactory
        ),
        ImageCreate(
            8,
            LOTM.supplementary_ing.basil.url,
            LOTM.supplementary_ing.basil.tag,
            supplementaryIngredientFactory
        ),
        // Spectator ing
        ImageCreate(
            9,
            LOTM.supplementary_ing.autumn_crocus_essence.url,
            LOTM.supplementary_ing.autumn_crocus_essence.tag,
            supplementaryIngredientFactory
        ),
        ImageCreate(
            10,
            LOTM.supplementary_ing.cow_teeth_paeonol_powder.url,
            LOTM.supplementary_ing.cow_teeth_paeonol_powder.tag,
            supplementaryIngredientFactory
        ),
        ImageCreate(
            11,
            LOTM.supplementary_ing.elf_flower.url,
            LOTM.supplementary_ing.elf_flower.tag,
            supplementaryIngredientFactory
        ),
    ]);
}

// MODEL CREATOR

async function CreatePathways() {
    console.log('Adding Pathways');
    const { getImage } = pathwayFactory;
    const tarotCard = tarotFactory.getTarot;
    const sefirah = sefirahFactory.getSefirah;
    await Promise.all([
        PathwayCreate(
            0,
            LOTM.pathways.the_fool.name,
            getImage(0).url,
            getImage(0).cloudinary_id,
            tarotCard(0),
            LOTM.pathways.the_fool.mythical_form,
            sefirah(0),
            LOTM.pathways.the_fool.above_the_sequence
        ),
        PathwayCreate(
            1,
            LOTM.pathways.red_priest.name,
            getImage(1).url,
            getImage(1).cloudinary_id,
            tarotCard(1),
            LOTM.pathways.red_priest.mythical_form,
            sefirah(1),
            LOTM.pathways.red_priest.above_the_sequence
        ),
        PathwayCreate(
            2,
            LOTM.pathways.visionary.name,
            getImage(2).url,
            getImage(2).cloudinary_id,
            tarotCard(2),
            LOTM.pathways.visionary.mythical_form,
            sefirah(2),
            LOTM.pathways.visionary.above_the_sequence
        ),
    ]);
}

async function CreateSefirahs() {
    console.log('Adding Sefirahs');
    const { getImage } = sefirahFactory;
    await Promise.all([
        SefirahCreate(
            0,
            LOTM.sefirahs.sefirah_castle.name,
            getImage(0).url,
            getImage(0).cloudinary_id,
            LOTM.sefirahs.sefirah_castle.possessor,
            LOTM.sefirahs.sefirah_castle.description
        ),
        SefirahCreate(
            1,
            LOTM.sefirahs.city_of_calamity.name,
            getImage(1).url,
            getImage(1).cloudinary_id,
            // LOTM.sefirahs.city_of_calamity.possessor,
            null,
            LOTM.sefirahs.city_of_calamity.description
        ),
        SefirahCreate(
            2,
            LOTM.sefirahs.chaos_sea.name,
            getImage(2).url,
            getImage(2).cloudinary_id,
            LOTM.sefirahs.chaos_sea.possessor,
            LOTM.sefirahs.chaos_sea.description
        ),
    ]);
}

async function CreateTarots() {
    console.log('Adding Tarots');
    const { getImage } = tarotFactory;
    await Promise.all([
        TarotCreate(
            0,
            LOTM.tarots.the_fool_card.name,
            getImage(0).url,
            getImage(0).cloudinary_id
        ),
        TarotCreate(
            1,
            LOTM.tarots.the_chariot.name,
            getImage(1).url,
            getImage(1).cloudinary_id
        ),
        TarotCreate(
            2,
            LOTM.tarots.justice_card.name,
            getImage(2).url,
            getImage(2).cloudinary_id
        ),
    ]);
}

async function CreateMainIng() {
    console.log('Adding Main ingredients');
    const { getImage } = mainIngredientFactory;
    await Promise.all([
        MainIngredientCreate(
            0,
            LOTM.main_ing.seer_beyonder_chara.name,
            getImage(0).url,
            getImage(0).cloudinary_id,
            LOTM.main_ing.seer_beyonder_chara.description,
            10
        ),
        MainIngredientCreate(
            1,
            LOTM.main_ing.hunter_beyonder_chara.name,
            getImage(1).url,
            getImage(1).cloudinary_id,
            LOTM.main_ing.hunter_beyonder_chara.description,
            10
        ),
        MainIngredientCreate(
            2,
            LOTM.main_ing.spectator_beyonder_chara.name,
            getImage(2).url,
            getImage(2).cloudinary_id,
            LOTM.main_ing.spectator_beyonder_chara.description,
            10
        ),
        // Seer ing
        MainIngredientCreate(
            3,
            LOTM.main_ing.lavos_squid_blood.name,
            getImage(3).url,
            getImage(3).cloudinary_id,
            LOTM.main_ing.lavos_squid_blood.description,
            10
        ),
        MainIngredientCreate(
            4,
            LOTM.main_ing.stellar_aqua_crystal.name,
            getImage(4).url,
            getImage(4).cloudinary_id,
            LOTM.main_ing.stellar_aqua_crystal.description,
            50
        ),
        // Spectator ing
        MainIngredientCreate(
            5,
            LOTM.main_ing.manhal_fish_eyeballs.name,
            getImage(5).url,
            getImage(5).cloudinary_id,
            LOTM.main_ing.manhal_fish_eyeballs.description,
            50
        ),
        MainIngredientCreate(
            6,
            LOTM.main_ing.goat_horned_blackfish_blood.name,
            getImage(6).url,
            getImage(6).cloudinary_id,
            LOTM.main_ing.goat_horned_blackfish_blood.description,
            50
        ),
    ]);
}

async function CreateSuppIng() {
    console.log('Adding Supplementary ingredients');
    const { getImage } = supplementaryIngredientFactory;
    await Promise.all([
        // Seer and Spectator ing
        SupplementaryIngredientCreate(
            0,
            LOTM.supplementary_ing.pure_water.name,
            getImage(0).url,
            getImage(0).cloudinary_id,
            LOTM.supplementary_ing.pure_water.description,
            50
        ),
        // Seer ing
        SupplementaryIngredientCreate(
            1,
            LOTM.supplementary_ing.night_vanilla_liquid.name,
            getImage(1).url,
            getImage(1).cloudinary_id,
            LOTM.supplementary_ing.night_vanilla_liquid.description,
            50
        ),
        SupplementaryIngredientCreate(
            2,
            LOTM.supplementary_ing.gold_mint_leaves.name,
            getImage(2).url,
            getImage(2).cloudinary_id,
            LOTM.supplementary_ing.gold_mint_leaves.description,
            50
        ),
        SupplementaryIngredientCreate(
            3,
            LOTM.supplementary_ing.poison_hemlock.name,
            getImage(3).url,
            getImage(3).cloudinary_id,
            LOTM.supplementary_ing.poison_hemlock.description,
            50
        ),
        SupplementaryIngredientCreate(
            4,
            LOTM.supplementary_ing.dragon_blood_grass_powder.name,
            getImage(4).url,
            getImage(4).cloudinary_id,
            LOTM.supplementary_ing.dragon_blood_grass_powder.description,
            50
        ),
        // Hunter ing
        SupplementaryIngredientCreate(
            5,
            LOTM.supplementary_ing.red_wine.name,
            getImage(5).url,
            getImage(5).cloudinary_id,
            LOTM.supplementary_ing.red_wine.description,
            50
        ),
        SupplementaryIngredientCreate(
            6,
            LOTM.supplementary_ing.red_chestnut_flower.name,
            getImage(6).url,
            getImage(6).cloudinary_id,
            LOTM.supplementary_ing.red_chestnut_flower.description,
            50
        ),
        SupplementaryIngredientCreate(
            7,
            LOTM.supplementary_ing.poplar_tree_leaf_powder.name,
            getImage(7).url,
            getImage(7).cloudinary_id,
            LOTM.supplementary_ing.poplar_tree_leaf_powder.description,
            50
        ),
        SupplementaryIngredientCreate(
            8,
            LOTM.supplementary_ing.basil.name,
            getImage(8).url,
            getImage(8).cloudinary_id,
            LOTM.supplementary_ing.basil.description,
            50
        ),
        // Spectator ing
        SupplementaryIngredientCreate(
            9,
            LOTM.supplementary_ing.autumn_crocus_essence.name,
            getImage(9).url,
            getImage(9).cloudinary_id,
            LOTM.supplementary_ing.autumn_crocus_essence.description,
            50
        ),
        SupplementaryIngredientCreate(
            10,
            LOTM.supplementary_ing.cow_teeth_paeonol_powder.name,
            getImage(10).url,
            getImage(10).cloudinary_id,
            LOTM.supplementary_ing.cow_teeth_paeonol_powder.description,
            50
        ),
        SupplementaryIngredientCreate(
            11,
            LOTM.supplementary_ing.elf_flower.name,
            getImage(11).url,
            getImage(11).cloudinary_id,
            LOTM.supplementary_ing.elf_flower.description,
            50
        ),
    ]);
}

async function CreateAbility() {
    console.log('Adding Supplementary ingredients');
    await Promise.all([
        // Seer abilities
        AbilityCreate(
            0,
            LOTM.ability.seer.divination.name,
            LOTM.ability.seer.divination.description
        ),
        AbilityCreate(
            1,
            LOTM.ability.seer.danger_intuition.name,
            LOTM.ability.seer.danger_intuition.description
        ),
        AbilityCreate(
            2,
            LOTM.ability.seer.spirit_vision.name,
            LOTM.ability.seer.spirit_vision.description
        ),
        AbilityCreate(
            3,
            LOTM.ability.seer.mysticism.name,
            LOTM.ability.seer.mysticism.description
        ),
        AbilityCreate(
            4,
            LOTM.ability.seer.enhanced_memory.name,
            LOTM.ability.seer.enhanced_memory.description
        ),
        // Hunter abilities
        AbilityCreate(
            5,
            LOTM.ability.hunter.physical_enhancement.name,
            LOTM.ability.hunter.physical_enhancement.description
        ),
        AbilityCreate(
            6,
            LOTM.ability.hunter.heightened_senses.name,
            LOTM.ability.hunter.heightened_senses.description
        ),
        AbilityCreate(
            7,
            LOTM.ability.hunter.trap_master.name,
            LOTM.ability.hunter.trap_master.description
        ),
        AbilityCreate(
            8,
            LOTM.ability.hunter.survival_knowledge.name,
            LOTM.ability.hunter.survival_knowledge.description
        ),
        // Spectator abilities
        AbilityCreate(
            9,
            LOTM.ability.spectator.body_language_Analysis.name,
            LOTM.ability.spectator.body_language_Analysis.description
        ),
        AbilityCreate(
            10,
            LOTM.ability.spectator.enhanced_mental_attributes.name,
            LOTM.ability.spectator.enhanced_mental_attributes.description
        ),
        AbilityCreate(
            11,
            LOTM.ability.spectator.enhanced_vision.name,
            LOTM.ability.spectator.enhanced_vision.description
        ),
    ]);
}

async function CreateSequence() {
    console.log('Adding Sequences');
    const { getImage } = sequenceFactory;
    const getPath = pathwayFactory.getPath;
    const getMainIng = mainIngredientFactory.getIngredient;
    const getSuppIng = supplementaryIngredientFactory.getIngredient;
    const getAbility = abilityFactory.getAbility;

    await Promise.all([
        // Seer
        SequenceCreate(
            0,
            LOTM.sequence.the_fool.seer.name,
            getImage(0).url,
            getImage(0).cloudinary_id,
            [getMainIng(0), getMainIng(3), getMainIng(4)],
            [
                getSuppIng(0),
                getSuppIng(1),
                getSuppIng(2),
                getSuppIng(3),
                getSuppIng(4),
            ],
            [
                getAbility(0),
                getAbility(1),
                getAbility(2),
                getAbility(3),
                getAbility(4),
            ],
            getPath(0)
        ),
        SequenceCreate(
            1,
            LOTM.sequence.red_priest.hunter.name,
            getImage(1).url,
            getImage(1).cloudinary_id,
            [getMainIng(1)],
            [getSuppIng(5), getSuppIng(6), getSuppIng(7), getSuppIng(8)],
            [getAbility(5), getAbility(6), getAbility(7), getAbility(8)],
            getPath(1)
        ),
        SequenceCreate(
            2,
            LOTM.sequence.visionary.spectator.name,
            getImage(2).url,
            getImage(2).cloudinary_id,
            [getMainIng(2), getMainIng(5), getMainIng(6)],
            [getSuppIng(0), getSuppIng(9), getSuppIng(10), getSuppIng(11)],
            [getAbility(9), getAbility(10), getAbility(11)],
            getPath(2)
        ),
    ]);
}
