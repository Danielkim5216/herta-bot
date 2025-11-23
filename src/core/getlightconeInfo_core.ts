import { SlashCommandBuilder, ChatInputCommandInteraction, User, EmbedBuilder } from 'discord.js';
import { Character, CombatType, languages, StarRail } from 'starrail.js';

export default async function getlightconeInfo_core(interaction: ChatInputCommandInteraction) {
    const client = new StarRail({ defaultLanguage: "kr", cacheDirectory: "./cache", showFetchCacheLog: true });
    client.cachedAssetsManager.cacheDirectorySetup();
    const lightConeName: string = interaction.options.getString
        ("lightconename") ?? "";
    let lightConeStarts: number = interaction.options.getInteger("starts") ?? 0; //기본 0중첩
    let lightConeLevel: number = interaction.options.getInteger("level") ?? 1; //기본 1레벨 
    //광추 이름에 띄어쓰기가 있으면 검색이 안된다 시발! 공백 제거해야함
    let lightConeImageurl = "";
    let lightConestar = 0;
    let lightConepath = "";
    let [Hp, Attack, Defence] = ["0", "0", "0"];

    try {
        if (lightConeStarts > 6) {   //최대 중첩 6중접까지만 (오류방지)
            lightConeStarts = 6;
        }
        if (lightConeLevel > 80) {   //최대 레벨 80레벨까지만
            lightConeLevel = 80;
        }
        function extractColorText(input: string): string | null {
            const regex = /<color=#f29e38ff>(.*?)<\/color>/;
            const match = input.match(regex);
            return match ? match[1] : null;  // match[1]이 <color>와 </color> 사이의 텍스트입니다.
        }

        const lightCones = client.getAllLightCones();
        // 모든 광추를 검색하면서 이름 비교
        for (const lightCone of lightCones) {
            const lightconeNames = lightCone.name.get("kr");
            // 공백을 제거한 후 비교하거나, 필요시 다른 문자로 바꾸기
            const formattedLightConeName = lightConeName.replace(/\s+/g, "");  // 모든 공백 제거
            if (formattedLightConeName === lightconeNames.replace(/\s+/g, "")) { // 서버에서 가져온 이름도 공백 제거
                lightConeImageurl = lightCone.icon.url; // or cardImage.url
                [Hp, Attack, Defence] = lightCone.getStatsByLevel(lightConeStarts, lightConeLevel).map(w => w.valueText);
                lightConestar = lightCone.stars;
                //lightConepath = lightCone.itemDescription.get("kr");
                lightConepath = extractColorText(lightCone.itemDescription.get("kr")) ?? "";
                break;
            }
        }
        // 결과가 없다면 처리
        if (!lightConeImageurl) {
            return interaction.reply("해당 광추를 찾을 수 없습니다.");
        }
        const embed = new EmbedBuilder()
            .setTitle(`${lightConeName}`)
            .setColor('White')
            .setImage(lightConeImageurl)
            .setDescription(`운명의 길 : ${lightConepath}`);

        embed.addFields(
            { name: '등급', value: `${lightConestar}성`, inline: true },
            { name: '중첩', value: `${lightConeStarts}`, inline: true },
            { name: '레벨', value: `${lightConeLevel}`, inline: true },
            { name: 'HP', value: `${Hp}`, inline: true },
            { name: '공격력', value: `${Attack}`, inline: true },
            { name: '방어력', value: `${Defence}`, inline: true }
        )


        interaction.reply({ embeds: [embed] });
    } catch (error) {
        interaction.reply(`${error}`);
    }

}