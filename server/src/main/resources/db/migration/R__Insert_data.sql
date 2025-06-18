BEGIN;

DELETE FROM testimonial CASCADE;

INSERT INTO
    testimonial (id, name, quote)
VALUES (
        1,
        'John Doe',
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga libero possimus quibusdam reiciendis, nemo quos, fugit rerum perferendis sequi reprehenderit mollitia similique non molestias nihil placeat quam? Est, repellat maiores!'
    ),
    (
        2,
        'Jane Doe',
        'Velit iure ut laborum? Voluptatum, inventore porro aliquam perspiciatis dolorum nemo sed eius quos recusandae laudantium, molestiae quo saepe voluptatem velit ab nesciunt praesentium quam consequatur, eveniet pariatur at. Qui.'
    ),
    (
        3,
        'John Smith',
        'Iste odit, voluptates asperiores ducimus cupiditate corporis. Voluptatem dolore quisquam necessitatibus, eligendi tenetur omnis laudantium dignissimos qui provident illo odio, magnam alias pariatur. Odio quasi facere tempora consequatur, veniam odit.'
    );

DELETE FROM location CASCADE;

INSERT INTO
    location (
        id,
        path,
        phone,
        note,
        google_map_link
    )
VALUES (
        1,
        'stpaul',
        '999-999-9999',
        '',
        'https://maps.app.goo.gl/sQ73f4cH488PJF9G6'
    ),
    (
        2,
        'edina',
        '999-999-9999',
        '',
        'https://maps.app.goo.gl/DPKPqq29TdGAAEz17'
    ),
    (
        3,
        'eagan',
        '999-999-9999',
        '',
        'https://maps.app.goo.gl/85dtMZnsrx7CTuPY9'
    ),
    (
        4,
        'edenprarie',
        '999-999-9999',
        '',
        'https://maps.app.goo.gl/uZRRiQnRVvRvcY617'
    ),
    (
        5,
        'applevalley',
        '999-999-9999',
        '',
        'https://maps.app.goo.gl/rLxiERWLpvMMRdnC6'
    ),
    (
        6,
        'minneapolis',
        '999-999-9999',
        'WE VALIDATE PARKING FOR UP TO 1 HR AT 811 LASALLE AVE US BANCORP GARAGE!',
        'https://maps.app.goo.gl/EwjaGRibLqmc1XLj6'
    );

DELETE FROM location_address CASCADE;

INSERT INTO
    location_address (
        id,
        street,
        city,
        state,
        zip,
        location_id
    )
VALUES (
        1,
        '867 Grand Avenue',
        'St Paul',
        'MN',
        '55105',
        1
    ),
    (
        2,
        '3865 Gallagher Dr',
        'Edina',
        'MN',
        '55435',
        2
    ),
    (
        3,
        '3365 Central Park Village Dr Suite 120',
        'Eagan',
        'MN',
        '55121',
        3
    ),
    (
        4,
        '12900 Technology Dr. Suite 180',
        'Eden Prarie',
        'MN',
        '55344',
        4
    ),
    (
        5,
        '14750 Cedar Avenue Suite 130',
        'Apple Valley',
        'MN',
        '55124',
        5
    ),
    (
        6,
        '800 Nicollet Mall Suite 250 Skyway',
        'Minneapolis',
        'MN',
        '55402',
        6
    );

DELETE FROM location_hours CASCADE;

INSERT INTO
    location_hours (
        id,
        day,
        open,
        close,
        location_id
    )
VALUES (1, 0, '08:00', '17:00', 1),
    (2, 1, '08:00', '17:00', 1),
    (3, 2, '08:00', '17:00', 1),
    (4, 3, '08:00', '17:00', 1),
    (5, 4, '08:00', '17:00', 1),
    (6, 5, '08:00', '17:00', 1),
    (7, 6, '08:00', '17:00', 1),
    (8, 0, '08:00', '17:00', 2),
    (9, 1, '08:00', '17:00', 2),
    (10, 2, '08:00', '17:00', 2),
    (11, 3, '08:00', '17:00', 2),
    (12, 4, '08:00', '17:00', 2),
    (13, 5, '08:00', '17:00', 2),
    (14, 6, '08:00', '17:00', 2),
    (15, 0, '09:00', '18:00', 3),
    (16, 1, '09:00', '18:00', 3),
    (17, 2, '09:00', '18:00', 3),
    (18, 3, '09:00', '18:00', 3),
    (19, 4, '09:00', '18:00', 3),
    (20, 5, '09:00', '18:00', 3),
    (21, 6, '09:00', '18:00', 3),
    (22, 0, '10:00', '19:00', 4),
    (23, 1, '10:00', '19:00', 4),
    (24, 2, '10:00', '19:00', 4),
    (25, 3, '10:00', '19:00', 4),
    (26, 4, '10:00', '19:00', 4),
    (27, 5, '10:00', '19:00', 4),
    (28, 6, '10:00', '19:00', 4),
    (29, 0, '11:00', '20:00', 5),
    (30, 1, '11:00', '20:00', 5),
    (31, 2, '11:00', '20:00', 5),
    (32, 3, '11:00', '20:00', 5),
    (33, 4, '11:00', '20:00', 5),
    (34, 5, '11:00', '20:00', 5),
    (35, 6, '11:00', '20:00', 5),
    (36, 0, '12:00', '21:00', 6),
    (37, 1, '12:00', '21:00', 6),
    (38, 2, '12:00', '21:00', 6),
    (39, 3, '12:00', '21:00', 6),
    (40, 4, '12:00', '21:00', 6),
    (41, 5, '12:00', '21:00', 6),
    (42, 6, '12:00', '21:00', 6);

DELETE FROM stylist CASCADE;

INSERT INTO
    stylist (
        id,
        name,
        title,
        profile_image,
        bio,
        location_id
    )
VALUES (
        1,
        'Jane Doe',
        'Stylist',
        'placeholder-profile-image-female-1.jpg',
        'Do ipsum sint veniam consequat esse. Do eiusmod id proident ex in nostrud excepteur. Laboris veniam qui ut aute quis tempor aute proident minim. Dolor exercitation est eiusmod enim sit tempor ea consequat aliquip do occaecat pariatur non esse. Duis esse ullamco ullamco deserunt consectetur nulla sunt sint ut ut minim sunt id sit. Cillum minim dolore reprehenderit veniam commodo labore et laboris qui laborum proident.',
        1
    ),
    (
        2,
        'Julie Doe',
        'Stylist',
        'placeholder-profile-image-female-1.jpg',
        'Excepteur commodo ullamco deserunt consectetur nulla sunt sint ut ut minim sunt id sit. Cillum minim dolore reprehenderit veniam commodo labore et laboris qui laborum proident.',
        1
    ),
    (
        3,
        'Jamie Doe',
        'Stylist',
        'placeholder-profile-image-female-1.jpg',
        'Ut cupidatat sunt laborum sint fugiat non eiusmod elit labore ad eiusmod eiusmod. Ipsum veniam deserunt non est ad proident non Lorem labore aliquip enim sit. Pariatur veniam fugiat minim est enim sunt ad nisi nostrud. Incididunt laborum deserunt dolor anim esse ut in. Id mollit est aliquip nulla laborum sit. Officia esse incididunt irure dolor occaecat laborum do elit veniam. Eu Lorem ad aliquip proident duis proident Lorem voluptate.',
        1
    ),
    (
        4,
        'Jane Doe',
        'Stylist',
        'placeholder-profile-image-female-1.jpg',
        'Sint culpa velit excepteur dolore ea. Qui ex culpa non veniam ad consectetur velit exercitation magna consequat. Nostrud est minim irure incididunt officia ut ex amet consequat. Velit incididunt dolore aliqua dolor do commodo cupidatat deserunt nostrud eiusmod do. Fugiat enim reprehenderit cupidatat ad esse dolor cupidatat fugiat amet irure laborum dolor occaecat officia. Sint nostrud do dolore est officia mollit id ullamco veniam officia in adipisicing consequat.',
        2
    ),
    (
        5,
        'Julie Doe',
        'Stylist',
        'placeholder-profile-image-female-1.jpg',
        'Consectetur consequat amet commodo minim. Officia consequat commodo occaecat reprehenderit. Labore reprehenderit deserunt est laboris esse adipisicing aliqua.',
        2
    ),
    (
        6,
        'Jamie Doe',
        'Stylist',
        'placeholder-profile-image-female-1.jpg',
        'Culpa magna consectetur in fugiat sit anim dolor ipsum ad ea et adipisicing culpa. Occaecat culpa in tempor elit mollit voluptate ullamco adipisicing velit consequat mollit ex. Aute sunt mollit proident incididunt esse quis mollit esse amet adipisicing labore ut dolore nisi.',
        2
    ),
    (
        7,
        'Jane Doe',
        'Stylist',
        'placeholder-profile-image-female-1.jpg',
        'Cillum minim dolore reprehenderit veniam commodo labore et laboris qui laborum proident.',
        3
    ),
    (
        8,
        'Julie Doe',
        'Stylist',
        'placeholder-profile-image-female-1.jpg',
        'Sit sit non do fugiat Lorem id ad ipsum. Qui ad consequat do eiusmod ullamco amet minim ex enim. Elit consectetur duis labore voluptate ea aliqua quis do anim est duis consectetur magna sunt. Reprehenderit adipisicing proident elit aliquip in duis irure nisi. Reprehenderit consequat mollit esse aliqua occaecat.',
        3
    ),
    (
        9,
        'Jamie Doe',
        'Stylist',
        'placeholder-profile-image-female-1.jpg',
        'Ipsum magna pariatur anim labore exercitation non qui adipisicing sunt minim. Officia minim veniam culpa proident proident deserunt Lorem mollit nulla in nulla in irure magna. Labore pariatur culpa sint non duis.',
        3
    );

DELETE FROM service CASCADE;

INSERT INTO
    service (id, name, description)
VALUES (
        1,
        'Classic Shave',
        'A classic straight razor shave. Begin with two steaming facial towels to soften the beard and open your pores. We apply warm pre-shave oil, continue with a full lathering and complete an initial shave along the grain of your beard. After re-lathering, we shave against your beard grain, if preferred. We finish with a cool facial towel and aftershave application.'
    ),
    (
        2,
        'Executive Shave',
        'Take your shave to the next level. Our Executive Shave offers everything included in our Classic Shave, plus a post-shave warm towel cleansing and Deep Detox clay mask application. We allow the mask to dry for 3-8 minutes, depending on skin type and then remove it with a clean, warm towel. We finish with a cool facial towel and aftershave application. Approximately 45 mins'
    ),
    (
        3,
        'Scalp-Smoothing Head Shave',
        'Who said your face should have all the fun? We move our steaming towels, pre-shave warm oil application, full lathering and straight razor shave from your face to your head to give you the sleek, smooth silhouette you love.'
    ),
    (
        4,
        'Gray Blending',
        'Get rid of unwanted grays without looking unnatural. We use a combination of your hair''s original colors and tones to provide coverage and naturally blend away grays.'
    ),
    (
        5,
        'Eye Brow Hair Removal',
        'The well-groomed man''s solution to the unibrow. Our careful brow waxing uses warm wax and cloth strips to separate a single brow into two.'
    ),
    (
        6,
        'Beard Trim & Shape',
        'Bring your beard back to glory. Our beard trim and shape helps tame wild whiskers, muscle moustaches back into shape and brings definition to shaggy shaves.'
    ),
    (
        7,
        'Youth Haircut',
        'Our same stylish men''s haircuts scaled down for smaller patrons. Available for boys ages 5-12.'
    ),
    (
        8,
        'Neck Wax',
        'Want to skip that neck trim between cuts and keep your neck clean for 3 weeks? This quick 10 minute service is the perfect way to avoid an unsightly neckline between your haircuts!'
    ),
    (
        9,
        'Ear or Nose Wax',
        '"I''m growing out my ear hair", said no guy ever... Gives us 5 minutes and we will get ride of those objectionable ear or nose hairs with a quick wax. It last longer than trimming them and your significant other will have a deeper affection for you.'
    ),
    (
        10,
        'Express Facial',
        'Want to look like you got 9 hours of sleep, a morning workout, and just finished a kale salad? Try our 15 minute express facial. We will rid you of dead skin, add some necessary moisture and give you a relaxing experience in the process.'
    ),
    (
        11,
        'Signature Facial',
        'A revitalizing facial formulated specifically for men. We analyze your skin and then use a customized men''s facial line to cleanse, exfoliate, hydrate and tone. This service takes it up a notch by including hot towel treatments and a relaxing face massage!'
    ),
    (
        12,
        'Haircut',
        'Just a regular haircut.'
    );

DELETE FROM stylist_service CASCADE;

INSERT INTO
    stylist_service (
        id,
        price,
        service_id,
        stylist_id
    )
VALUES (1, 30, 12, 1),
    (2, 35, 12, 2),
    (3, 40, 12, 3),
    (4, 30, 12, 4),
    (5, 35, 12, 5);

COMMIT;