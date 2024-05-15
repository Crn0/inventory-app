import __dirname from '../../public/images/imgDirname.mjs';

const loTMData = {
    pathways: {
        the_fool: {
            name: 'The Fool',
            url: `${__dirname}/The_Fool_Art.png`,
            above_the_sequence: 'Lord of the Mysteries',
            mythical_form: 'A tentacled vortex made up of Worms of Spirit',
            tag: 'pathway_art',
        },
        red_priest: {
            name: 'Red Priest',
            url: `${__dirname}/Red_Priest_Art.png`,
            above_the_sequence: 'Calamity of Destruction',
            mythical_form: 'Calamity Giant',
            tag: 'pathway_art',
        },
        visionary: {
            name: 'Visionary',
            url: `${__dirname}/Visionary_Art.png`,
            above_the_sequence: 'God Almighty',
            mythical_form: 'Mind Dragon',
            tag: 'pathway_art',
        },
    },
    sefirahs: {
        sefirah_castle: {
            name: 'Sefirah Castle',
            url: `${__dirname}/Sefirah_Castle_Art.png`,
            possessor: 'The Fool',
            description:
                "The Sefirah Castle , previously called the mysterious space above the Gray Fog before Klein Moretti (Zhou Mingrui) knew its name[1] and is also called The Door of Light, is one of the nine Sefirot on Earth, a legacy left behind by the Original Creator and originally owned by The Celestial Worthy of Heaven and Earth. Corresponds to one of the Three Pillars, Lord of the Mysteries Group. The Demonic Wolf Flegrea knew its name and tried to get in it in \"His\" entire life through the Fool Pathway but never succeeded. Therefore, many powerful creatures suspect that the Sefirah Castle doesn't exist and is only an abstract concept. Klein is able to go above the gray fog through a certain ritual he had learned when he was still in 21st century China. In the Sefirah Castle, Klein holds regular Tarot Club meetings where he poses as Mr. Fool. Once stable, the Sefirah Castle's core appears as a strange door of light mark on humanoid Klein's glabella",
            tag: 'sefirah_art',
        },
        city_of_calamity: {
            name: 'City of Calamity',
            url: `${__dirname}/City_of_Calamity_Art.png`,
            possessor: '',
            description:
                'The City of Calamity is one of the nine Sefirot on Earth, a legacy left behind by the Original Creator. It is one of two Sefirot possessed by the Fourth Pillar, a hidden Pillar formed passively upon the point when "the end of the universe" arrives It corresponds to the Calamity of Destruction group.',
            tag: 'sefirah_art',
        },
        chaos_sea: {
            name: 'Chaos Sea',
            url: `${__dirname}/Chaos_Sea_Art.png`,
            possessor: 'Adam',
            description:
                'The Chaos Sea is one of the nine Sefirot on Earth, a legacy left behind by the Original Creator and originally possessed by The Primordial One. It corresponds to one of the Three Pillars, the God Almighty Group. The Ancient Gods believe that this sefirah is a source of corruption beneath the world. The Chaos Sea is very large. It almost fills the core of Earth, and goes to a further layer. It’s also the only sefirah that merges the real and the illusory and has an entrance in the real world, which means it can be entered through the physical world. The known portal to enter the Chaos Sea is underneath Chernobyl in the Forsaken Land of the Gods (Eastern Continent). According to Amon, the First Blasphemy Slate was likely born there, but it was later attracted by some power and left the ground before it was complete.',
            tag: 'sefirah_art',
        },
    },
    tarots: {
        the_fool_card: {
            name: 'The Fool',
            url: `${__dirname}/The_Fool_Card_Art.png`,
            tag: 'tarot_art',
            path: 'Red Priest',
        },
        the_chariot: {
            name: 'The Chariot',
            url: `${__dirname}/The_Chariot_Card_Art.png`,
            tag: 'tarot_art',
            path: 'The Fool',
        },
        justice_card: {
            name: 'Justice',
            url: `${__dirname}/Justice_Card_Art.png`,
            tag: 'tarot_art',
            path: 'Visionary',
        },
    },
    sequence: {
        the_fool: {
            seer: {
                name: 'Seer',
                url: `${__dirname}/Potion_-_Fool_Sequence_9_-_Seer.png`,
                tag: 'sequence_art',
                path: 'The Fool',
            },
        },
        red_priest: {
            hunter: {
                name: 'Hunter',
                url: `${__dirname}/Potion_-_Red_Priest_Sequence_9_-_Hunter.png`,
                tag: 'sequence_art',
            },
        },
        visionary: {
            spectator: {
                name: 'Spectator',
                url: `${__dirname}/Potion_-_Visionary_Sequence_9_-_Spectator.png`,
                tag: 'sequence_art',
            },
        },
    },
    main_ing: {
        seer_beyonder_chara: {
            name: 'Seer beyonder characteristic',
            url: `${__dirname}/The_Fool_beyonder_chara.png`,
            description:
                'When a Beyonder dies, due to the Law of Beyonder Characteristics Indestructibility, the extraordinary material originally used by that Beyonder will precipitate, leaving a "Beyonder Characteristic" with their mental imprint regardless of their Sequence level.',
            tag: 'main_ingredient_art',
        },
        hunter_beyonder_chara: {
            name: 'Hunter beyonder characteristic',
            url: `${__dirname}/Red_priest_beyonder_chara.png`,
            description:
                'When a Beyonder dies, due to the Law of Beyonder Characteristics Indestructibility, the extraordinary material originally used by that Beyonder will precipitate, leaving a "Beyonder Characteristic" with their mental imprint regardless of their Sequence level.',
            tag: 'main_ingredient_art',
        },
        spectator_beyonder_chara: {
            name: 'Spectator beyonder characteristic',
            url: `${__dirname}/Visionary_beyonder_chara.png`,
            description:
                'When a Beyonder dies, due to the Law of Beyonder Characteristics Indestructibility, the extraordinary material originally used by that Beyonder will precipitate, leaving a "Beyonder Characteristic" with their mental imprint regardless of their Sequence level.',
            tag: 'main_ingredient_art',
        },
        lavos_squid_blood: {
            name: "Lavos squid's blood",
            url: `${__dirname}/Lavos_squid_blood.png`,
            description:
                'The unique substance exhibits a striking blue hue. Occasionally, it emits illusory bubbles, suggestive of a connection to the spiritual realm. However, its distinctive properties degrade rapidly under sunlight, necessitating storage in opaque containers to preserve its unique qualities.',
            tag: 'main_ingredient_art',
        },
        stellar_aqua_crystal: {
            name: 'Stellar aqua crystal',
            url: `${__dirname}/Stellar_aqua_crystal.png`,
            description:
                'An exceptionally pure crystal with a gelatinous appearance reminiscent of Earthly jelly. Despite its lack of hardness, it reflects light in a mesmerizing manner, appearing to contain a luminous void of stars when illuminated by blue light. Its properties make it an ideal material for crafting divination crystals.',
            tag: 'main_ingredient_art',
        },
        manhal_fish_eyeballs: {
            name: "Matured manhal fish's eyeballs",
            url: `${__dirname}/Matured_manhal_fish_eyeball.png`,
            description:
                'Manhal Fish Eyeballs are rare, mystical items harvested from the enigmatic Manhal Fish, found only in the crystal-clear depths of the Lake of Whispers. These large, iridescent eyeballs, shifting in hues from deep ocean blues to flashes of violet, appear almost alive with their dilating pupils. Coveted by alchemists and wizards, they grant holders brief, cryptic visions of distant places or future events and emit a calming, ambient glow useful for meditation and illumination. Ground into powder, they serve as potent ingredients in elixirs that enhance clairvoyance, amplify magical abilities, and create powerful restorative potions.',
            tag: 'main_ingredient_art',
        },
        goat_horned_blackfish_blood: {
            name: 'Goat-horned blackfish blood',
            url: `${__dirname}/Goat_horned_blackfish_blood.png`,
            description:
                'Goat-Horned Blackfish Blood is a rare and potent substance harvested from the elusive Goat-Horned Blackfish, a creature known for its spiraled horns and inky black scales, found in the shadowy depths of the Obsidian Marshes. This thick, dark fluid, with an iridescent sheen shifting from deep crimson to pitch black, is highly coveted by alchemists and sorcerers. It significantly enhances spells and elixirs related to shadow, stealth, and transformation, and is crucial for potions granting night vision. Additionally, its regenerative properties can rapidly heal wounds and restore vitality, but it carries a dark side, leaving users with an insatiable thirst for more, risking a descent into shadowy madness if overused.',
            tag: 'main_ingredient_art',
        },
    },
    supplementary_ing: {
        pure_water: {
            name: 'Pure water',
            url: `${__dirname}/Purified_water.png`,
            description:
                'Water that has undergone repeated distillation, resulting in the removal of impurities and contaminants, leaving behind a high degree of purity.',
            tag: 'supplementary_ingredient_art',
        },
        night_vanilla_liquid: {
            name: 'Night vanilla liquids',
            url: `${__dirname}/Night_vanilla_liquids.png`,
            description:
                'A herb native to the red moon, possessing unique properties. Its essence can be extracted and preserved as an essential oil for various uses.',
            tag: 'supplementary_ingredient_art',
        },
        gold_mint_leaves: {
            name: 'Gold mint leaves',
            url: `${__dirname}/Gold_mint_leaves.png`,
            description: 'Leaves emitting a fresh and stimulating scent.',
            tag: 'supplementary_ingredient_art',
        },
        poison_hemlock: {
            name: 'Poison hemlock',
            url: `${__dirname}/Poison_hemlock.png`,
            description:
                'A highly toxic substance that induces numbness throughout the body, potentially leading to death if ingested. Historically, it has been notorious as a method of suicide due to its potent effects.',
            tag: 'supplementary_ingredient_art',
        },
        dragon_blood_grass_powder: {
            name: 'Dragon blood grass powder',
            url: `${__dirname}/Dragon_blood_grass_powder.png`,
            description: 'A deep black powder.',
            tag: 'supplementary_ingredient_art',
        },
        red_wine: {
            name: 'Red wine',
            url: `${__dirname}/Red_wine.png`,
            description: 'A red wine',
            tag: 'supplementary_ingredient_art',
        },
        red_chestnut_flower: {
            name: 'Red chestnut flower',
            url: `${__dirname}/Red_chestnut_flower.png`,
            description:
                'The Red Chestnut Flower is a vibrant and enchanting blossom renowned for its deep crimson petals and striking beauty. Found in the mystical woodlands of Eldergrove, this flower is not only admired for its aesthetic appeal but also for its powerful magical properties. Herbalists and healers prize the Red Chestnut Flower for its ability to enhance vitality and promote rapid healing when used in salves and potions. Additionally, the petals, when brewed into a tea, are said to bring clarity of thought and bolster courage, making it a favorite among adventurers and scholars alike.',
            tag: 'supplementary_ingredient_art',
        },
        poplar_tree_leaf_powder: {
            name: 'Poplar tree leaf powder',
            url: `${__dirname}/Poplar_tree_leaf_powder.png`,
            description:
                'Poplar Tree Leaf Powder is a finely ground substance derived from the leaves of the ancient Poplar trees found in the serene forests of Valenwood. Known for its subtle silver-green hue, this powder is highly valued for its soothing and restorative properties. When added to balms and ointments, it accelerates the healing of wounds and reduces inflammation. Additionally, when consumed in small amounts, it acts as a mild sedative, helping to calm the mind and promote restful sleep',
            tag: 'supplementary_ingredient_art',
        },
        basil: {
            name: 'Basil',
            url: `${__dirname}/Basil.png`,
            description: 'A basil',
            tag: 'supplementary_ingredient_art',
        },
        autumn_crocus_essence: {
            name: 'Autumn crocus essence',
            url: `${__dirname}/Autumn_crocus_essence.png`,
            description:
                'Autumn Crocus Essence is a potent extract derived from the vibrant petals of the autumn crocus, a flower that blooms in the cool, crisp days of fall. This essence is prized in both alchemy and herbal medicine for its remarkable anti-inflammatory and pain-relieving properties. A few drops added to a potion can significantly enhance its healing effects, making it invaluable for treating chronic ailments and injuries. However, due to its potency, it must be used with caution, as excessive amounts can be toxic.',
            tag: 'supplementary_ingredient_art',
        },
        cow_teeth_paeonol_powder: {
            name: 'Cow teeth paeonol powder',
            url: `${__dirname}/Cow_teeth_paeonol_powder.png`,
            description:
                'Cow Teeth Paeonol Powder is a unique and rare alchemical ingredient made from the finely ground teeth of cows, infused with paeonol, a compound extracted from peony bark. This powder is renowned for its potent anti-inflammatory and analgesic properties, making it a key component in remedies for pain relief and swelling. It is often used in the creation of salves and tinctures designed to treat joint pain and arthritis. Despite its benefits, the preparation of this powder is complex and requires precise techniques to ensure the proper extraction and combination of paeonol with the teeth, making it a highly valued item among skilled alchemists.',
            tag: 'supplementary_ingredient_art',
        },
        elf_flower: {
            name: 'Elf flower petals',
            url: `${__dirname}/Elf_flower_petals.png`,
            description:
                'Elf Flower Petals are delicate, luminescent petals from the rare Elf Flower, found only in the enchanted glades of the Feywild. These petals are prized for their magical properties, known to enhance spells related to healing and protection when incorporated into potions and charms. Additionally, they emit a soft, soothing glow, making them a sought-after ingredient for creating light sources that calm and focus the mind. Due to their rarity and the difficulty of harvesting them without disturbing the magical balance of their native habitat, Elf Flower Petals are highly coveted by both alchemists and enchanters.',
            tag: 'supplementary_ingredient_art',
        },
    },
    ability: {
        seer: {
            divination: {
                name: 'Divination',
                description: [
                    'They lack direct skills confronting enemies but are experts in Divination. They are able to master all kinds of Divination methods, including astrology, cartomancy, spiritual pendulums, spiritual numbers, and scrying.',
                ],
            },
            danger_intuition: {
                name: 'Danger Intuition',
                description: [
                    'They can intuitively detect danger using their Spirituality.',
                ],
            },
            spirit_vision: {
                name: 'Spirit Vision',
                description: [
                    " They can use Spirit Vision to see non-physical things, such as ghosts and specters. They could see the different parts of a Soul, deduce a person's health and emotions, and determine if something has a magical aura.",
                ],
            },
            mysticism: {
                name: 'Mysticism',
                description: [
                    "They don't directly gain knowledge about Mysticism, only the skills and abilities to learn it.",
                    "They don't directly gain knowledge about Mysticism, only the skills and abilities to learn it.",
                ],
            },
            enhanced_memory: {
                name: 'Enhanced Memory',
                description: [
                    'Initially, Seers have a slight increase in memory that improves along with the digestion of the potion.',
                ],
            },
        },
        hunter: {
            physical_enhancement: {
                name: 'Physical Enhancement',
                description: [
                    'They possess inhuman physical qualities, giving them increased strength, speed, reaction, body control, and natural healing ability.',
                    'hey possess the strength of a bear and the agility of a cat, being slightly equivalent to the combination of the two.',
                    'Their punches are strong enough to easily cause the air to release cracking sounds.',
                    'They gain a few centimeters in height.',
                ],
            },
            heightened_senses: {
                name: 'Heightened Senses',
                description: [
                    'Their auditory, olfactory, and visual senses are enhanced exponentially, this gives them strong tracking skills.',
                    'This allows them to accurately discern different scents; "see" invisible footprints and minute details; and hear hushed sounds.',
                    "Their supernatural sensory abilities would only appear when they focus, taking the form of a weaker version that doesn't disturb them in their everyday lives.",
                ],
            },
            trap_master: {
                name: 'Trap Master',
                description: [
                    'They can accurately locate certain spots in their environment, enabling them to efficiently set up traps in their surroundings.',
                    'This ability allows Hunters to find natural traps, such as unstable cliffs or quicksand, to trap an opponent without setting one up first.',
                    'Hunters also gain a level of expertise with the use of explosives, allowing them to act as a demolition expert, or rig intricate explosive traps',
                ],
            },
            survival_knowledge: {
                name: 'Survival Knowledge',
                description: [
                    'They gain knowledge about wild plants and animal organs, allowing them to survive better in the wilderness, quickly find hemostatic medicine when injured, and make poisons to smear their weapons with.',
                ],
            },
            danger_instinct: {
                name: 'Danger Instinct',
                description: [
                    'They can passively sense ill intentions and danger.',
                ],
            },
        },
        spectator: {
            body_language_Analysis: {
                name: 'Body Language Analysis',
                description: [
                    'Spectators possess keen powers of observation when it comes to observing individuals.',
                    "They can look at a person strictly from a bystander's perspective, discovering their true thoughts from their expressions, their manners, and their subconscious actions.",
                    'Through this, they can accurately figure out connections and draw conclusions from the details they gathered to form an accurate mental model of the target.',
                ],
            },
            enhanced_mental_attributes: {
                name: 'Enhanced Mental Attributes',
                description: [
                    'Their Body of Heart and Mind would receive great enhancement. Their inferential, analytical, observational, and identification abilities along with their memory would be greatly enhanced .',
                    'If an animal drinks this potion, it will gain intelligence and the ability to speak in human language.',
                    'When Susie accidentally drinks a potion, she starts to become more human-like and learns how to speak in a few days.',
                ],
            },
            enhanced_vision: {
                name: 'Enhanced Vision',
                description: [
                    "A Spectator will also possess the sharpened eyesight needed to analyze a target's body language.",
                    'Even though Audrey Hall was in the corner of a ballroom party, she could still accurately notice the subtle movements of other people from afar.',
                ],
            },
        },
    },
};

export default loTMData;
